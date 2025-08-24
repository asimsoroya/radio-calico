# RadioCalico 📻

A modern web-based radio streaming application with lossless HLS audio streaming capabilities and a Node.js backend API.

## Features

- **Lossless HLS Audio Streaming**: High-quality audio streaming using HLS.js
- **Modern Web Interface**: Clean, responsive design with glassmorphism effects
- **RESTful API**: Node.js/Express backend with SQLite database
- **User Management**: Create and manage users
- **Posts System**: Create and view posts with author attribution
- **Real-time Audio Controls**: Play/pause, volume control, and stream status
- **Cross-browser Support**: Works with native HLS support or HLS.js fallback

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript, HLS.js
- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **Streaming**: HLS (HTTP Live Streaming)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/asimsoroya/radio-calico.git
cd radio-calico
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
  ```json
  {
    "name": "User Name",
    "email": "user@example.com"
  }
  ```

### Posts
- `GET /api/posts` - Get all posts with author information
- `POST /api/posts` - Create a new post
  ```json
  {
    "title": "Post Title",
    "content": "Post content",
    "user_id": 1
  }
  ```

## Development

### Development Mode
```bash
npm run dev
```

### Project Structure
```
radio-calico/
├── public/
│   └── index.html          # Frontend application
├── server.js               # Express server
├── database.js             # Database configuration
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Stream Configuration

The default HLS stream URL is configured in both:
- `public/index.html` (line 228)
- `stream_URL.txt`

To change the stream source, update the `streamUrl` variable in the HTML file.

## Browser Compatibility

- **Modern browsers**: Uses HLS.js for broad compatibility
- **Safari/iOS**: Native HLS support
- **Chrome/Firefox/Edge**: HLS.js fallback

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- HLS.js for cross-browser HLS streaming support
- Express.js for the web framework
- SQLite for the lightweight database solution