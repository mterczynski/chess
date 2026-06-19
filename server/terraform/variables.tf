variable "project_id" {
  description = "GCP Project ID"
  type        = string
  nullable    = false
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "europe-west1"
}

variable "server_image_uri" {
  description = "Container image URI for server (e.g., gcr.io/project/chess-api:latest)"
  type        = string
  nullable    = false
}

variable "database_url" {
  description = "Database connection URL"
  type        = string
  sensitive   = true
  nullable    = false
}
