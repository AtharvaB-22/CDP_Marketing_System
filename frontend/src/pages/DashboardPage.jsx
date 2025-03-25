
// import React, { useState } from 'react';
// import { Box, Typography, Card, CardContent, IconButton, Button, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import EditIcon from '@mui/icons-material/Edit';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import { useNavigate } from 'react-router-dom';
// import { ResizableBox } from 'react-resizable'; // For resizing
// import 'react-resizable/css/styles.css'; // For resizing
// import Chatbot from '../components/Chatbot';

// const DashboardPage = () => {
//   const [widgets, setWidgets] = useState([
//     { id: 1, title: 'Customer Profile', content: 'Customer details will be displayed here.' },
//     { id: 2, title: 'Support Tickets', content: 'List of support tickets will be displayed here.' },
//     { id: 3, title: 'Offers & Recommendations', content: 'Offers and recommendations will be displayed here.' },
//   ]);
//   const [editingWidget, setEditingWidget] = useState(null);
//   const [selectedWidgetType, setSelectedWidgetType] = useState('');
//   const [user] = useState({ firstName: 'Atharva' });
//   const navigate = useNavigate();  // useNavigate hook

//   const widgetOptions = [
//     { value: 'Customer Profile', label: 'Customer Profile' },
//     { value: 'Support Tickets', label: 'Support Tickets' },
//     { value: 'Offers & Recommendations', label: 'Offers & Recommendations' },
//     { value: 'Payment History', label: 'Payment History' },
//     { value: 'Policy Details', label: 'Policy Details' },
//   ];

//   const addWidget = () => {
//     const newWidget = {
//       id: widgets.length + 1,
//       title: widgetOptions[0].value, 
//       content: `Details for ${widgetOptions[0].value}`,
//     };
//     setWidgets([...widgets, newWidget]);
//   };

//   const removeWidget = (id) => {
//     setWidgets(widgets.filter((widget) => widget.id !== id));
//   };

//   const startEditing = (widget) => {
//     setEditingWidget(widget);
//     setSelectedWidgetType(widget.title);
//   };

//   const saveEdit = () => {
//     setWidgets(
//       widgets.map((widget) =>
//         widget.id === editingWidget.id ? { ...widget, title: selectedWidgetType, content: `Details for ${selectedWidgetType}` } : widget
//       )
//     );
//     setEditingWidget(null);
//   };

//   const handleViewDetails = (widget) => {
//     navigate(`/widget/${widget.id}`, { state: { widget } });
//   };

//   const handleDragEnd = (result) => {
//     if (!result.destination) return;
//     const items = Array.from(widgets);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);
//     setWidgets(items);
//   };

//   return (
//     <Box sx={{ p: 3, backgroundColor: '#F4F4F9', minHeight: '100vh' }}>
//       <Typography variant="h4" gutterBottom sx={{ color: '#2C3E50', fontWeight: 'bold', textAlign: 'center' }}>
//         {user.firstName}'s Dashboard
//       </Typography>
//       <DragDropContext onDragEnd={handleDragEnd}>
//         <Droppable droppableId="widgets">
//           {(provided) => (
//             <Box
//               sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//             >
//               {widgets.map((widget, index) => (
//                 <Draggable key={widget.id} draggableId={widget.id.toString()} index={index}>
//                   {(provided) => (
//                     <Box
//                       sx={{ flex: '1 1 calc(33.333% - 24px)', minWidth: '320px', marginBottom: '20px' }}
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                     >
//                       <ResizableBox 
//                         width={400} 
//                         height={250} 
//                         axis="both" 
//                         minConstraints={[320, 200]} 
//                         maxConstraints={[700, 350]} 
//                         resizeHandles={['se']} // Bottom-right corner handle for resizing
//                       >
//                         <Card sx={{
//                           backgroundColor: '#ffffff', 
//                           boxShadow: 12, 
//                           borderRadius: '12px', 
//                           padding: '20px',
//                           transition: 'transform 0.3s', 
//                           '&:hover': { transform: 'scale(1.05)' },
//                           border: '1px solid #dfe6e9'
//                         }}>

//                           {/* Drag Handle on top of the card */}
//                           <Box sx={{ position: 'absolute', top: 5, left: 5, zIndex: 1 }}>
//                             <IconButton {...provided.dragHandleProps} sx={{ color: '#2ecc71' }}>
//                               <EditIcon />
//                             </IconButton>
//                           </Box>

//                           <CardContent>
//                             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                               <Typography variant="h6" gutterBottom sx={{ color: '#2ecc71', fontWeight: 'bold' }}>
//                                 {widget.title}
//                               </Typography>
//                               <Box>
//                                 <IconButton onClick={() => startEditing(widget)}>
//                                   <EditIcon sx={{ color: '#2ecc71' }} />
//                                 </IconButton>
//                                 <IconButton onClick={() => removeWidget(widget.id)}>
//                                   <CloseIcon sx={{ color: '#e74c3c' }} />
//                                 </IconButton>
//                               </Box>
//                             </Box>
//                             <Typography sx={{ color: '#7f8c8d', marginBottom: '20px', fontStyle: 'italic' }}>
//                               {widget.content}
//                             </Typography>
//                             <Button
//                               variant="contained"
//                               sx={{ backgroundColor: '#1abc9c', color: '#fff', '&:hover': { backgroundColor: '#16a085' } }}
//                               onClick={() => handleViewDetails(widget)}
//                             >
//                               View Details
//                             </Button>
//                           </CardContent>
//                         </Card>
//                       </ResizableBox>
//                     </Box>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </Box>
//           )}
//         </Droppable>
//       </DragDropContext>

//       {/* Add Widget Button */}
//       <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
//         <Card sx={{ display: 'flex', justifyContent: 'center', backgroundColor: '#ffffff', boxShadow: 12, borderRadius: 4 }}>
//           <Button
//             variant="contained"
//             sx={{ backgroundColor: '#1abc9c', color: '#fff', '&:hover': { backgroundColor: '#16a085' }, margin: '15px', padding: '12px 24px' }}
//             onClick={addWidget}
//           >
//             Add Widget
//           </Button>
//         </Card>
//       </Box>

//       {/* Chatbot */}
//       <Chatbot />

//       {/* Edit Widget Dialog */}
//       <Dialog open={Boolean(editingWidget)} onClose={() => setEditingWidget(null)}>
//         <DialogTitle sx={{ color: '#2980B9' }}>Edit Widget</DialogTitle>
//         <DialogContent>
//           <Select
//             value={selectedWidgetType}
//             onChange={(e) => setSelectedWidgetType(e.target.value)}
//             fullWidth
//             sx={{ mb: 2 }}
//           >
//             {widgetOptions.map((option) => (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setEditingWidget(null)} sx={{ color: '#e74c3c' }}>Cancel</Button>
//           <Button onClick={saveEdit} sx={{ color: '#2980B9' }}>Save</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default DashboardPage;

import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, IconButton, Button, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import { ResizableBox } from 'react-resizable'; // For resizing
import 'react-resizable/css/styles.css'; // For resizing
import Chatbot from '../components/Chatbot';

const DashboardPage = () => {
  const [widgets, setWidgets] = useState([
    { id: 1, title: 'Customer Profile', content: 'Customer details will be displayed here.' },
    { id: 2, title: 'Support Tickets', content: 'List of support tickets will be displayed here.' },
    { id: 3, title: 'Offers & Recommendations', content: 'Offers and recommendations will be displayed here.' },
  ]);
  const [editingWidget, setEditingWidget] = useState(null);
  const [selectedWidgetType, setSelectedWidgetType] = useState('');
  const [user] = useState({ firstName: 'Atharva' });
  const navigate = useNavigate();  // useNavigate hook

  const widgetOptions = [
    { value: 'Customer Profile', label: 'Customer Profile' },
    { value: 'Support Tickets', label: 'Support Tickets' },
    { value: 'Offers & Recommendations', label: 'Offers & Recommendations' },
    { value: 'Payment History', label: 'Payment History' },
    { value: 'Policy Details', label: 'Policy Details' },
  ];

  const addWidget = () => {
    const newWidget = {
      id: widgets.length + 1,
      title: widgetOptions[0].value, 
      content: `Details for ${widgetOptions[0].value}`,
    };
    setWidgets([...widgets, newWidget]);
  };

  const removeWidget = (id) => {
    setWidgets(widgets.filter((widget) => widget.id !== id));
  };

  const startEditing = (widget) => {
    setEditingWidget(widget);
    setSelectedWidgetType(widget.title);
  };

  const saveEdit = () => {
    setWidgets(
      widgets.map((widget) =>
        widget.id === editingWidget.id ? { ...widget, title: selectedWidgetType, content: `Details for ${selectedWidgetType}` } : widget
      )
    );
    setEditingWidget(null);
  };

  const handleViewDetails = (widget) => {
    navigate(`/widget/${widget.id}`, { state: { widget } });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setWidgets(items);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#F4F4F9', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#2C3E50', fontWeight: 'bold', textAlign: 'center' }}>
        {user.firstName}'s Dashboard
      </Typography>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="widgets">
          {(provided) => (
            <Box
              sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {widgets.map((widget, index) => (
                <Draggable key={widget.id} draggableId={widget.id.toString()} index={index}>
                  {(provided) => (
                    <Box
                      sx={{ flex: '1 1 calc(33.333% - 24px)', minWidth: '320px', marginBottom: '20px' }}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <ResizableBox 
                        width={400} 
                        height={250} 
                        axis="both" 
                        minConstraints={[320, 200]} 
                        maxConstraints={[700, 350]} 
                        resizeHandles={['se']} // Bottom-right corner handle for resizing
                      >
                        <Card sx={{
                          backgroundColor: '#ffffff', 
                          boxShadow: 12, 
                          borderRadius: '12px', 
                          padding: '20px',
                          transition: 'transform 0.3s', 
                          '&:hover': { transform: 'scale(1.05)' },
                          border: '1px solid #dfe6e9'
                        }}>

                          <CardContent {...provided.dragHandleProps}> {/* Drag handle is now the whole header area */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'move' }}>

                              <Typography variant="h6" gutterBottom sx={{ color: '#2ecc71', fontWeight: 'bold' }}>
                                {widget.title}
                              </Typography>
                              <Box>
                                <IconButton onClick={() => startEditing(widget)}>
                                  <EditIcon sx={{ color: '#2ecc71' }} />
                                </IconButton>
                                <IconButton onClick={() => removeWidget(widget.id)}>
                                  <CloseIcon sx={{ color: '#e74c3c' }} />
                                </IconButton>
                              </Box>
                            </Box>
                            <Typography sx={{ color: '#7f8c8d', marginBottom: '20px', fontStyle: 'italic' }}>
                              {widget.content}
                            </Typography>
                            <Button
                              variant="contained"
                              sx={{ backgroundColor: '#1abc9c', color: '#fff', '&:hover': { backgroundColor: '#16a085' } }}
                              onClick={() => handleViewDetails(widget)}
                            >
                              View Details
                            </Button>
                          </CardContent>
                        </Card>
                      </ResizableBox>
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>

      {/* Add Widget Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <Card sx={{ display: 'flex', justifyContent: 'center', backgroundColor: '#ffffff', boxShadow: 12, borderRadius: 4 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#1abc9c', color: '#fff', '&:hover': { backgroundColor: '#16a085' }, margin: '15px', padding: '12px 24px' }}
            onClick={addWidget}
          >
            Add Widget
          </Button>
        </Card>
      </Box>

      {/* Chatbot */}
      <Chatbot />

      {/* Edit Widget Dialog */}
      <Dialog open={Boolean(editingWidget)} onClose={() => setEditingWidget(null)}>
        <DialogTitle sx={{ color: '#2980B9' }}>Edit Widget</DialogTitle>
        <DialogContent>
          <Select
            value={selectedWidgetType}
            onChange={(e) => setSelectedWidgetType(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          >
            {widgetOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingWidget(null)} sx={{ color: '#e74c3c' }}>Cancel</Button>
          <Button onClick={saveEdit} sx={{ color: '#2980B9' }}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashboardPage;


// npm install react-beautiful-dnd react-resizable @mui/material @mui/icons-material react-router-dom
// npm install react-resizable
// npm install react-router-dom
// npm install react-router-dom@latest react-router@latest