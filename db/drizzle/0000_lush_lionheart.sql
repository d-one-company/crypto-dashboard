CREATE TABLE IF NOT EXISTS "crypto_dashboard_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"username" text NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "crypto_dashboard_user_email_unique" UNIQUE("email"),
	CONSTRAINT "crypto_dashboard_user_username_unique" UNIQUE("username")
);
