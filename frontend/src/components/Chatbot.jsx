// import React, { useState } from 'react';
// import { Box, TextField, List, ListItem, IconButton, Typography } from '@mui/material';
// import ChatIcon from '@mui/icons-material/Chat'; // Import chat icon
// import CloseIcon from '@mui/icons-material/Close'; // Import close icon

// // Wrap the chatbot window with Fade
// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isOpen, setIsOpen] = useState(false); // State to toggle chatbot visibility

//   const sendMessage = async () => {
//     if (input.trim()) {
//       const userMessage = { text: input, sender: 'user' };
//       setMessages((prev) => [...prev, userMessage]);
//       setInput('');

//       try {
//         const response = await fetch('http://localhost:3000/api/chatbot', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ message: input }),
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch chatbot response');
//         }

//         const data = await response.json();
//         setMessages((prev) => [...prev, { text: data.response, sender: 'bot' }]);
//       } catch (error) {
//         setMessages((prev) => [
//           ...prev,
//           { text: 'Sorry, something went wrong. Please try again later.', sender: 'bot' },
//         ]);
//         console.error('Error:', error);
//       }
//     }
//   };

//   return (
//     <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
//       {isOpen ? (
//         <Box
//           sx={{
//             width: 350,
//             height: 500,
//             bgcolor: 'background.paper',
//             boxShadow: 3,
//             borderRadius: 2,
//             display: 'flex',
//             flexDirection: 'column',
//           }}
//         >
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               p: 2,
//               bgcolor: 'primary.main',
//               color: 'white',
//               borderTopLeftRadius: 8,
//               borderTopRightRadius: 8,
//             }}
//           >
//             <Typography variant="h6">Chatbot</Typography>
//             <IconButton onClick={() => setIsOpen(false)} sx={{ color: 'white' }}>
//               <CloseIcon />
//             </IconButton>
//           </Box>
//           <List sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
//             {messages.map((msg, index) => (
//               <ListItem key={index} sx={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
//                 <Box
//                   sx={{
//                     bgcolor: msg.sender === 'user' ? 'primary.main' : 'grey.300',
//                     color: msg.sender === 'user' ? 'white' : 'black',
//                     p: 1.5,
//                     borderRadius: 2,
//                     maxWidth: '70%',
//                   }}
//                 >
//                   <Typography>{msg.text}</Typography>
//                 </Box>
//               </ListItem>
//             ))}
//           </List>
//           <Box sx={{ p: 2, borderTop: '1px solid grey.300' }}>
//             <TextField
//               fullWidth
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//               placeholder="Type a message..."
//             />
//           </Box>
//         </Box>
//       ) : (
//         <IconButton
//           onClick={() => setIsOpen(true)}
//           sx={{
//             bgcolor: 'primary.main',
//             color: 'white',
//             '&:hover': { bgcolor: 'primary.dark' },
//           }}
//         >
//           <ChatIcon />
//         </IconButton>
//       )}
//     </Box>
//   );
// };

// export default Chatbot;


import React, { useState } from 'react';
import { Box, TextField, List, ListItem, IconButton, Typography } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat'; // Import chat icon
import CloseIcon from '@mui/icons-material/Close'; // Import close icon

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false); // State to toggle chatbot visibility

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');

      try {
        const response = await fetch('http://localhost:3000/api/chatbot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: input }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch chatbot response');
        }

        const data = await response.json();
        setMessages((prev) => [...prev, { text: data.response, sender: 'bot' }]);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          { text: 'Sorry, something went wrong. Please try again later.', sender: 'bot' },
        ]);
        console.error('Error:', error);
      }
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
      {isOpen ? (
        <Box
          sx={{
            width: 350,
            height: 500,
            bgcolor: 'background.paper',
            boxShadow: 3,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              bgcolor: '#1abc9c',
              color: 'white',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          >
            <Typography variant="h6">Chatbot</Typography>
            <IconButton onClick={() => setIsOpen(false)} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
            {messages.map((msg, index) => (
              <ListItem key={index} sx={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <Box
                  sx={{
                    bgcolor: msg.sender === 'user' ? 'primary.main' : 'grey.300',
                    color: msg.sender === 'user' ? 'white' : 'black',
                    p: 1.5,
                    borderRadius: 2,
                    maxWidth: '70%',
                  }}
                >
                  <Typography>{msg.text}</Typography>
                </Box>
              </ListItem>
            ))}
          </List>
          <Box sx={{ p: 2, borderTop: '1px solid grey.300' }}>
            <TextField
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
            />
          </Box>
        </Box>
      ) : (
        <IconButton
          onClick={() => setIsOpen(true)}
          sx={{
            bgcolor: '#1abc9c',
            color: 'white',
            '&:hover': { bgcolor: '#16a085' },
          }}
        >
          <ChatIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default Chatbot;
