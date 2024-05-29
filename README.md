# Text2SQL Chatbot Project

## Overview

This project presents a comprehensive training and inference pipeline for a Text2SQL model complemented by a user-friendly chatbot interface. The pipeline leverages Google Colab for both training and inference stages, integrating various libraries like `llamaindex`, `Flask`, and `ngrok` for streamlined operation. Moreover, it seamlessly incorporates the `Hugging Face` library to deploy either the Zephyr-7B-Alpha language model or the Defog/SQLCoder model from Hugging Face. The project also utilizes Supabase as the database service.

## Setup

Before executing the code, ensure you've completed the following prerequisites:

### Configure ngrok authtoken:

1. Obtain an authtoken from ngrok.
2. Integrate the obtained authtoken into the secrets as <b>ngrok_token</b> section within Google Colab for efficient port forwarding.

### Configure ngrok domain

You can get a static domain from ngrok and add it to the secret as <b>domain_ngrok</b>

### Update Database URI:

Modify the database URI in the code to connect to the necessary schema required for training. For confidentiality reasons, the schema contains 10+ tables.

### Requirements

- `requirements.txt`: Required packages for the Zephyr-7B-Alpha model.
- `requirements2.txt`: Required packages for the Defog/SQLCoder model.

## Training and Inference Pipeline

### Version 1: Zephyr-7B-Alpha Language Model

#### Advantages

- Results remain consistent even if the database changes.
- Requires less GPU resources.

#### Disadvantages

- Results may not be as accurate and can sometimes produce hallucinations.
- Slower performance.

- Utilizes `llamaindex` to facilitate loading of the Zephyr-7B-Alpha language model from Hugging Face.
- Employs `Flask` to establish a server dedicated to handling inference requests.
- Utilizes `ngrok` to enable port forwarding, making the Flask server accessible over the internet.

### Version 2: Defog/SQLCoder Model

#### Advantages

- Provides accurate results even for complex queries.
- Offers faster performance.

#### Disadvantages

- Schema creation is manual; refer to Hugging Face documentation for details.
- Requires significant GPU resources.

- Deploys the Defog/SQLCoder model from Hugging Face.
- Utilizes `Flask` to establish a server dedicated to handling inference requests.
- Utilizes `ngrok` to enable port forwarding for external access.

## Database

We are using Supabase as our database service. The next step in the project is to convert the raw SQL query to Supabase format. However, if the tool being used accepts raw SQL queries, users can easily retrieve the data using the returned SQL statement.

## Chatbot Interface

The project incorporates a user-centric chatbot interface developed using `Next.js` and styled with `Tailwind CSS`. This interface interacts with the Flask server hosted on Google Colab for seamless inference.

> **Note**: Users might need to update the URL within the Next.js app to match the ngrok URL generated in Google Colab for optimal chatbot functionality.

## Usage

1. Select the desired Google Colab version to initialize the respective training and inference pipeline.
2. Access the ngrok URL provided in Google Colab to engage with the Flask server.
3. Ensure the Next.js app API URL aligns with the ngrok URL to maintain chatbot functionality.

## Additional Notes

- Implement robust authentication and authorization protocols when exposing services to the internet.
- Safeguard sensitive data like database credentials and authtokens through secure handling.
- Zephyr Alpha performance is degrading to get the best possible result it's best to use chat GPT for the 1st model

## Contributors

Patrick Saade
