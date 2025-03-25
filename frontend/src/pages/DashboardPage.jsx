
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, IconButton, Button, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';  // Keep useNavigate here
import { ResizableBox } from 'react-resizable';  // Import for resizing
import 'react-resizable/css/styles.css'; // Import styles for resizing
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
  const navigate = useNavigate();  // Ensure useNavigate is used properly

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
    navigate(`/widget/${widget.id}`, { state: { widget } });  // Navigate to the details page
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setWidgets(items);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#F8F9FA', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#4A90E2', fontWeight: 'bold' }}>
        {user.firstName}'s Dashboard
      </Typography>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="widgets">
          {(provided) => (
            <Box
              sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {widgets.map((widget, index) => (
                <Draggable key={widget.id} draggableId={widget.id.toString()} index={index}>
                  {(provided) => (
                    <Box
                      sx={{ flex: '1 1 calc(33.333% - 24px)', minWidth: '300px' }}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <ResizableBox 
                        width={400} 
                        height={200} 
                        axis="x" 
                        minConstraints={[300, 200]} 
                        maxConstraints={[600, 300]} 
                      >
                        <Card {...provided.dragHandleProps} sx={{ backgroundColor: '#ffffff', boxShadow: 3, borderRadius: 2 }}>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="h6" gutterBottom sx={{ color: '#4A90E2' }}>
                                {widget.title}
                              </Typography>
                              <Box>
                                <IconButton onClick={() => startEditing(widget)}>
                                  <EditIcon sx={{ color: '#4A90E2' }} />
                                </IconButton>
                                <IconButton onClick={() => removeWidget(widget.id)}>
                                  <CloseIcon sx={{ color: '#d32f2f' }} />
                                </IconButton>
                              </Box>
                            </Box>
                            <Typography sx={{ color: '#555', mb: 2 }}>{widget.content}</Typography>
                            <Button
                              variant="contained"
                              sx={{ backgroundColor: '#50E3C2', color: '#fff', '&:hover': { backgroundColor: '#3FB39A' } }}
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
      <Box sx={{ flex: '1 1 calc(33.333% - 24px)', minWidth: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', boxShadow: 3, borderRadius: 2 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#50E3C2', color: '#fff', '&:hover': { backgroundColor: '#3FB39A' } }}
            onClick={addWidget}
          >
            Add Widget
          </Button>
        </Card>
      </Box>
      <Chatbot />

      {/* Edit Dialog */}
      <Dialog open={Boolean(editingWidget)} onClose={() => setEditingWidget(null)}>
        <DialogTitle sx={{ color: '#4A90E2' }}>Edit Widget</DialogTitle>
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
          <Button onClick={() => setEditingWidget(null)} sx={{ color: '#d32f2f' }}>Cancel</Button>
          <Button onClick={saveEdit} sx={{ color: '#4A90E2' }}>Save</Button>
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