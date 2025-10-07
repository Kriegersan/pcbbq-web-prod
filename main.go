package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/smtp"
	"os"

	"github.com/rs/cors" // Import the cors package
)

// Configuration struct to hold environment variables
type Config struct {
	ToEmail   string // The email address to send the contact form to
	FromEmail string // The sender email address (your Gmail)
	Password  string // Your Gmail App Password
	SmtpHost  string // Gmail SMTP server
	SmtpPort  string // Gmail SMTP port
}

// ContactFormData struct to parse the JSON request body
type ContactFormData struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

// Global config variable
var appConfig Config

// contactHandler handles the POST request from the contact form
func contactHandler(w http.ResponseWriter, r *http.Request) {
	// The CORS middleware handles these headers, but we can leave them for clarity if needed
	// w.Header().Set("Access-Control-Allow-Origin", "*")
	// w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	// w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// The CORS middleware also handles the OPTIONS preflight request
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	// Ensure the request method is POST
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Decode the JSON from the request body into our struct
	var formData ContactFormData
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&formData)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Basic validation
	if formData.Name == "" || formData.Email == "" || formData.Message == "" {
		http.Error(w, `{"error": "All fields are required"}`, http.StatusBadRequest)
		return
	}

	// --- Email Sending Logic ---
	// The message body for the email
	msg := []byte(fmt.Sprintf(
		"From: %s\r\n"+
			"To: %s\r\n"+
			"Subject: New Contact Form Submission from Pine Coast BBQ\r\n\r\n"+
			"You have a new message from your website:\n\n"+
			"Name: %s\n\n"+
			"Email: %s\n\n"+
			"Message:\n%s\n",
		appConfig.FromEmail, appConfig.ToEmail, formData.Name, formData.Email, formData.Message))

	// Authenticate with the SMTP server
	auth := smtp.PlainAuth("", appConfig.FromEmail, appConfig.Password, appConfig.SmtpHost)

	// Send the email
	smtpAddr := fmt.Sprintf("%s:%s", appConfig.SmtpHost, appConfig.SmtpPort)
	err = smtp.SendMail(smtpAddr, auth, appConfig.FromEmail, []string{appConfig.ToEmail}, msg)
	if err != nil {
		log.Printf("Error sending email: %v", err)
		http.Error(w, `{"error": "Failed to send message"}`, http.StatusInternalServerError)
		return
	}

	// Respond with a success message
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Message sent successfully!"})
	log.Printf("Successfully sent email from %s", formData.Email)
}

// loadConfig loads configuration from environment variables
func loadConfig() {
	appConfig.ToEmail = os.Getenv("TO_EMAIL")
	appConfig.FromEmail = os.Getenv("FROM_EMAIL")
	appConfig.Password = os.Getenv("GMAIL_APP_PASSWORD")
	appConfig.SmtpHost = "smtp.gmail.com"
	appConfig.SmtpPort = "587"

	if appConfig.ToEmail == "" || appConfig.FromEmail == "" || appConfig.Password == "" {
		log.Fatal("FATAL: Environment variables TO_EMAIL, FROM_EMAIL, and GMAIL_APP_PASSWORD must be set.")
	}
}


func main() {
	loadConfig() // Load environment variables on startup

	mux := http.NewServeMux()

	// Handle API endpoint
	mux.HandleFunc("/api/contact", contactHandler)

	// CORS configuration
	// Explicitly list the allowed origins.
	// This tells the browser that it's safe to accept requests from your frontend domain.
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"https://pinecoastbbq.com", "http://localhost:3000"}, // Allow production and local development
		AllowedMethods:   []string{"POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: true,
	})

	handler := c.Handler(mux) // Wrap your router with the CORS middleware

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("API Server starting on port %s...", port)
	log.Println("API endpoint available at /api/contact")

	if err := http.ListenAndServe(":"+port, handler); err != nil { // Use the CORS-wrapped handler
		log.Fatal("ListenAndServe:", err)
	}
}