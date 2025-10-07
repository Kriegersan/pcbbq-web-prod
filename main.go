package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/rs/cors" // Import the cors package
	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
)

// Configuration struct to hold environment variables
type Config struct {
	ToEmail         string // The email address to send the contact form to
	FromEmail       string // The sender email address (your verified SendGrid sender)
	SendGridAPIKey  string // Your SendGrid API Key
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
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var formData ContactFormData
	if err := json.NewDecoder(r.Body).Decode(&formData); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if formData.Name == "" || formData.Email == "" || formData.Message == "" {
		http.Error(w, `{"error": "All fields are required"}`, http.StatusBadRequest)
		return
	}

	// --- Email Sending Logic using SendGrid ---
	from := mail.NewEmail("Pine Coast BBQ Contact Form", appConfig.FromEmail)
	subject := "New Contact Form Submission from " + formData.Name
	to := mail.NewEmail("Pine Coast BBQ Admin", appConfig.ToEmail)
	
	plainTextContent := fmt.Sprintf("Name: %s\nEmail: %s\nMessage: %s", formData.Name, formData.Email, formData.Message)
	htmlContent := fmt.Sprintf("<strong>Name:</strong> %s<br><strong>Email:</strong> %s<br><strong>Message:</strong><br><p>%s</p>", formData.Name, formData.Email, formData.Message)
	
	message := mail.NewSingleEmail(from, subject, to, plainTextContent, htmlContent)
	client := sendgrid.NewSendClient(appConfig.SendGridAPIKey)
	response, err := client.Send(message)
	
	if err != nil {
		log.Printf("Error sending email via SendGrid: %v", err)
		http.Error(w, `{"error": "Failed to send message"}`, http.StatusInternalServerError)
		return
	}

	// SendGrid's API returns a 202 Accepted status on success.
	if response.StatusCode >= 200 && response.StatusCode < 300 {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]string{"message": "Message sent successfully!"})
		log.Printf("Successfully sent email from %s via SendGrid", formData.Email)
	} else {
		log.Printf("SendGrid returned a non-success status code: %d. Body: %s", response.StatusCode, response.Body)
		http.Error(w, `{"error": "Failed to send message due to an external service error"}`, http.StatusInternalServerError)
	}
}

// loadConfig loads configuration from environment variables
func loadConfig() {
	appConfig.ToEmail = os.Getenv("TO_EMAIL")
	appConfig.FromEmail = os.Getenv("FROM_EMAIL") // This should be a verified sender in SendGrid
	appConfig.SendGridAPIKey = os.Getenv("SENDGRID_API_KEY")

	if appConfig.ToEmail == "" || appConfig.FromEmail == "" || appConfig.SendGridAPIKey == "" {
		log.Fatal("FATAL: Environment variables TO_EMAIL, FROM_EMAIL, and SENDGRID_API_KEY must be set.")
	}
}

func main() {
	loadConfig() // Load environment variables on startup

	mux := http.NewServeMux()

	mux.HandleFunc("/api/contact", contactHandler)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"https://pinecoastbbq.com", "http://localhost:3000"},
		AllowedMethods:   []string{"POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: true,
	})

	handler := c.Handler(mux)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("API Server starting on port %s...", port)
	log.Println("API endpoint available at /api/contact")

	if err := http.ListenAndServe(":"+port, handler); err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}