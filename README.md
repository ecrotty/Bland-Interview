# Bland.ai Interview Simulator

This Node.js application integrates with the Bland.ai API to conduct realistic phone-based interview simulations.

## Features

- Authenticates with the Bland.ai API
- Initiates phone calls to specified numbers
- Conducts interviews with predefined questions and dynamic responses
- Provides real-time feedback based on interviewee's answers
- Handles error scenarios gracefully
- Logs call data and interview results
- Implements API rate limiting
- Ensures GDPR and data privacy compliance

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add your Bland.ai API key:
   ```
   BLAND_AI_API_KEY=your_bland_ai_api_key_here
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```
2. Send a POST request to `/start-interview` with the following JSON body:
   ```json
   {
     "phoneNumber": "+1234567890"
   }
   ```

## Error Handling

The application implements error handling for various scenarios:
- Invalid API credentials
- Network errors
- Invalid phone numbers
- Call drops or failures

Errors are logged using Winston logger and can be found in `error.log` and `combined.log` files.

## Data Privacy and GDPR Compliance

- Call recordings are not stored permanently
- User data is not shared with third parties
- Implement proper data deletion mechanisms as needed

## Testing

Run tests using:
```
npm test
```

## License

This project is licensed under the MIT License.
