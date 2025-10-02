package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/smtp"
	"os"
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
	// Set CORS headers to allow requests from the React frontend
	w.Header().Set("Access-Control-Allow-Origin", "*") // Be more specific in production
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// Handle preflight OPTIONS request for CORS
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
	loadConfig()

	// Serve the React build files
	// This assumes you will place your React 'build' directory inside the Go project
	fs := http.FileServer(http.Dir("./pine-coast-bbq-app/build"))
	http.Handle("/", fs)

	// API route for the contact form
	http.HandleFunc("/api/contact", contactHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default port if not specified
	}

	log.Printf("Server starting on port %s...", port)
	log.Printf("Serving React app from './pine-coast-bbq-app/build'")
	log.Printf("API endpoint available at /api/contact")

	// Start the server
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
