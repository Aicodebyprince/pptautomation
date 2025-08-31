
# 🚀 CMMI Navigator: Implementation Kickoff

**CMMI Navigator** is a dynamic, web-based tool designed to streamline and standardize the kickoff process for CMMI (Capability Maturity Model Integration) implementation projects. This application empowers consulting firms and internal process groups to quickly generate customized, professional, and comprehensive kickoff materials for their clients or teams.

Built with a modern tech stack, it features an interactive interface where users can input project-specific data and receive a complete, ready-to-use webpage that can also be exported to DOCX and PPTX formats.

---

## ✨ Key Features

- **Interactive Kickoff Form**: Easily input all project parameters, from company names and maturity levels to specific man-day estimations for various activities.
- **Dynamic Content Generation**: The entire website content updates in real-time based on the data you provide in the form.
- **AI-Powered Suggestions**: Leverage the "Action Item Generator" to get AI-driven, context-aware suggestions for different CMMI implementation phases.
- **Export Functionality**: Download the complete kickoff plan as a professionally formatted **Microsoft Word (DOCX)** document or a **PowerPoint (PPTX)** presentation with a single click.
- **Responsive Design**: A beautiful and fully responsive interface built with Next.js and ShadCN UI, ensuring a seamless experience on any device.
- **Component-Based Architecture**: Clean, reusable, and well-organized code leveraging the best practices of React and Next.js.

---

## 🛠️ Tech Stack

This project is built with a modern, robust, and scalable technology stack:

- **Framework**: [Next.js](https://nextjs.org/) (React Framework)
- **Generative AI**: [Google's Genkit](https://firebase.google.com/docs/genkit)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for validation
- **Document Generation**:
  - `docx` for Microsoft Word files.
  - `pptxgenjs` for PowerPoint files.

---

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or newer recommended)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add your Google AI API key:
    ```
    GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

---

## Usage

1.  **Launch the Application**: Open the web application in your browser.
2.  **Open the Edit Form**: Click the pencil icon floating at the bottom-right of the screen.
3.  **Fill in the Details**: Complete the form with your client's and project's information across the different tabs.
4.  **Update Content**: Click "Update Website" to see your changes reflected instantly across the entire page.
5.  **Generate AI Action Items**: In the "Next Steps" section, use the AI Action Item Generator to create tailored tasks for the initial project phase.
6.  **Download Documents**: Use the buttons in the "Download" section to export the entire plan as a DOCX or PPTX file.

---

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.
