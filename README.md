# CogniTune RAG Optimizer

An interactive web-based toolkit for the end-to-end analysis, optimization, and evaluation of Retrieval-Augmented Generation (RAG) pipelines.

CogniTune is a sophisticated, visually stunning web application designed for AI developers and researchers to analyze, optimize, and evaluate Retrieval-Augmented Generation (RAG) pipelines. It provides a seamless, interactive, and comprehensive toolkit for configuring every component of a RAG system, from document ingestion to response generation. The application is structured as a multi-step wizard, guiding the user through the optimization process with real-time feedback and rich data visualizations.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/raymondhocc/CogniTune--0251006-155127)

## Table of Contents

- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Development](#development)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [License](#license)

## Key Features

- **Pipeline Configuration**: Custom naming, multi-format document support, and domain-specific configurations.
- **Document Analysis**: Statistical analysis, readability metrics, and automatic recommendations for chunking.
- **Text Chunking Strategy**: Multiple chunking methods (Recursive, Fixed Size, Semantic) with configurable parameters.
- **Embedding Model Selection**: Supports a wide range of popular embedding models with performance evaluation.
- **Advanced Retrieval Methods**: Dense, Sparse, Hybrid, and ColBERT retrieval with re-ranking options.
- **Generation Tuning**: Fine-tune LLM parameters (GPT-4, Claude, Llama 2) for optimal response generation.
- **Performance Evaluation**: Comprehensive dashboard with metrics like Hit Rate, MRR, Faithfulness, and Latency.
- **Preset Management**: Save, load, and export complete pipeline configurations as JSON.

## Technology Stack

- **Frontend**: React, Vite, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **Backend**: Cloudflare Workers, Hono
- **Persistence**: Cloudflare Durable Objects

## Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine.
- A [Cloudflare account](https://dash.cloudflare.com/sign-up).

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/cognitune-rag-optimizer.git
    cd cognitune-rag-optimizer
    ```

2.  **Install dependencies:**
    ```sh
    bun install
    ```

3.  **Configure Environment Variables:**

    Create a `.dev.vars` file in the root of the project by copying the example:
    ```sh
    cp .dev.vars.example .dev.vars
    ```

    Update `.dev.vars` with your Cloudflare AI Gateway credentials. You can find these in your Cloudflare Dashboard.

    ```ini
    # .dev.vars

    # Cloudflare AI Gateway URL
    CF_AI_BASE_URL="https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_ID/openai"

    # Cloudflare API Key (or any string, as it's handled by the gateway)
    CF_AI_API_KEY="your-cloudflare-api-key"
    ```

## Development

To run the application in development mode with hot-reloading:

```sh
bun dev
```

This will start the Vite development server for the frontend and the `wrangler` development server for the backend worker. The application will be accessible at `http://localhost:3000`.

## Deployment

This project is designed for easy deployment to Cloudflare's global network.

1.  **Login to Wrangler:**
    ```sh
    bunx wrangler login
    ```

2.  **Deploy the application:**
    ```sh
    bun run deploy
    ```
    This command builds the frontend application and deploys it along with the worker to Cloudflare.

3.  **Configure Environment Variables in Cloudflare:**

    After deployment, you need to set the environment variables in your Worker's dashboard:
    - Go to your Cloudflare Dashboard -> Workers & Pages -> Your Application.
    - Navigate to `Settings` -> `Variables`.
    - Add the `CF_AI_BASE_URL` and `CF_AI_API_KEY` secrets. Make sure to encrypt them.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/raymondhocc/CogniTune--0251006-155127)

## Project Structure

-   `src/`: Contains the frontend React application code.
    -   `components/`: Reusable UI components, including shadcn/ui components.
    -   `pages/`: Main pages of the application.
    -   `lib/`: Utility functions, constants, and the Zustand store.
-   `worker/`: Contains the backend Cloudflare Worker code.
    -   `agent.ts`: The core `ChatAgent` Durable Object class.
    -   `userRoutes.ts`: Hono API routes for the application.
    -   `index.ts`: The entry point for the Cloudflare Worker.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.