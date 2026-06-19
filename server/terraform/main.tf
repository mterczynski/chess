terraform {
  required_version = ">= 1.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_project_service" "run_api" {
  service = "run.googleapis.com"
  disable_on_destroy = false
}

resource "google_cloud_run_service" "chess_api" {
  name     = "chess-api"
  location = var.region

  template {
    spec {
      containers {
        image = var.server_image_uri

        env {
          name  = "DATABASE_URL"
          value = var.database_url
        }

        resources {
          limits = {
            cpu    = "1"
            memory = "512Mi"
          }
        }
      }

      max_instances = 1
      min_instances = 0
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [google_project_service.run_api]
}

resource "google_cloud_run_service_iam_member" "chess_api_public" {
  service       = google_cloud_run_service.chess_api.name
  location      = google_cloud_run_service.chess_api.location
  role          = "roles/run.invoker"
  member        = "allUsers"
}

output "api_url" {
  value       = google_cloud_run_service.chess_api.status[0].url
  description = "Cloud Run API endpoint"
}
