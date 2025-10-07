# Use the official Golang image which includes all necessary tools and certificates
FROM golang:1.21-bookworm as builder

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./
# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download

# Copy the source code from the current directory to the Working Directory inside the container
COPY . .

# Build the Go app
RUN CGO_ENABLED=0 GOOS=linux go build -v -o server .


# --- Final Stage ---
# Start a new, smaller image to reduce final image size
FROM debian:bookworm-slim

# It's good practice to install certificates again in the final slim image
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

# Copy the built binary from the builder stage
COPY --from=builder /app/server /usr/local/bin/server

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run the executable
CMD ["server"]