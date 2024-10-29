# New App

New App is a website source code generator that allows users to generate simple HTML and CSS code for a website based on their description.

## Features

- **User Authentication**: Sign in with your preferred social account or via magic link email. Supported providers are Google, Facebook, and Apple.

- **Website Description Input**: Provide a detailed description of the website you want to generate.

- **Generate Source Code**: Click on the "Generate Code" button to generate the HTML and CSS code for your website.

- **View Generated Code**: The generated HTML and CSS code will be displayed on the screen for you to copy and use.

## User Journey

1. **Sign In**
   - Open the app. You will be prompted to sign in.
   - Click on the preferred authentication method (Google, Facebook, Apple, or Magic Link).
   - After successful authentication, you will be redirected to the main page.

2. **Describe Your Website**
   - On the main page, you will see a text area labeled "Describe the website you want to generate".
   - Enter a detailed description of the website you want to generate. For example:
     - "A personal blog homepage with a header, navigation menu, featured posts section, and a footer with social media links."
     - "A simple landing page for a coffee shop with an image banner, about section, menu section, and contact form."

3. **Generate Code**
   - After entering your description, click on the "Generate Code" button.
   - The app will process your request. A loading indicator will appear to show that the code is being generated.
   - Please wait while the code is being generated. Do not click the button multiple times.

4. **View and Copy Generated Code**
   - Once the code is generated, it will be displayed on the screen.
   - You will see two sections: one for the HTML code and one for the CSS code.
   - You can scroll through the code in each section.
   - Copy the code and use it in your own projects.

5. **Sign Out**
   - To sign out of the app, click on the "Sign Out" button at the top right corner.

## External Services Used

- **ZAPT.ai**: The app uses ZAPT.ai's services for authentication and event handling.
- **ChatGPT API**: The app sends your website description to the backend, which uses the ChatGPT API to generate the corresponding HTML and CSS code.

## Notes

- The generated code is intended for educational and prototyping purposes. It may require additional customization for production use.
- The app is free to use.
