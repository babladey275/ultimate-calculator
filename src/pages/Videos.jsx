import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import toast from "react-hot-toast";
import { createFeedbacks } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

const Videos = () => {
  const { userId } = useAuth();
  const [expandedSurvey, setExpandedSurvey] = useState({});
  const [feedback, setFeedback] = useState({});
  const [completedVideos, setCompletedVideos] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const videos = [
    {
      id: "video1",
      title: "Introduction to Turnkey Property Investing",
      questions: [
        {
          id: "q1",
          text: "How familiar were you with turnkey property investing before watching?",
          options: [
            "Not familiar",
            "Somewhat familiar",
            "Very familiar",
            "Expert",
          ],
        },
        {
          id: "q2",
          text: "What's your biggest question about turnkey investing?",
          textInput: true,
        },
      ],
    },
    {
      id: "video2",
      title: "Market Selection for Maximum ROI",
      questions: [
        {
          id: "q1",
          text: "Which market mentioned in the video interests you the most?",
          options: ["Atlanta", "Dallas", "Indianapolis", "Cleveland"],
        },
        {
          id: "q2",
          text: "What factors are most important to you when selecting a market?",
          options: [
            "Cash flow",
            "Appreciation",
            "Low vacancy",
            "Strong job market",
          ],
        },
      ],
    },
    {
      id: "video3",
      title: "Property Management & Maximizing Returns",
      questions: [
        {
          id: "q1",
          text: "How important is professional property management to you?",
          options: [
            "Not important",
            "Somewhat important",
            "Very important",
            "Essential",
          ],
        },
        {
          id: "q2",
          text: "What concerns do you have about remote property ownership?",
          textInput: true,
        },
      ],
    },
  ];

  const handleExpandSurvey = (videoId, questionId) => {
    setExpandedSurvey((prev) => ({
      ...prev,
      [videoId]: prev[videoId] === questionId ? null : questionId,
    }));
  };

  const handleFeedbackChange = (videoId, questionId, value) => {
    setFeedback((prev) => ({
      ...prev,
      [`${videoId}-${questionId}`]: value,
    }));
  };

  const isFeedbackComplete = (video) => {
    return video.questions.every((q) => {
      const key = `${video.id}-${q.id}`;
      return feedback[key] && feedback[key].trim() !== "";
    });
  };

  const handleSubmitFeedback = async (videoId) => {
    const video = videos.find((v) => v.id === videoId);
    const responses = {}; // Prepare the responses object dynamically

    video.questions.forEach((q) => {
      const key = `${videoId}-${q.id}`;
      if (feedback[key]) {
        responses[q.id] = feedback[key];
      }
    });

    // Ensure the request body matches the required format
    const feedbackData = {
      videoId,
      responses, // Dynamically created responses object
      contactId: userId, // Ensure the user ID is sent correctly
    };

    try {
      setSubmitting(true);
      await createFeedbacks(feedbackData); // Pass the data to the backend
      setCompletedVideos((prev) => [...prev, videoId]);
      toast.success("Feedback submitted successfully!");
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const isCurrentVideo = (index) => index === completedVideos.length;

  return (
    <Box
      sx={{
        width: "100%",
        my: 4,
        p: 3,
        borderRadius: 1,
        boxShadow: 2,
        textAlign: "left",
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Educational Videos
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        Learn more about turnkey property investments through our educational
        video series.
      </Typography>

      {videos.map((video, index) => (
        <Box
          key={video.id}
          sx={{ mb: 4, pb: 2, borderBottom: "1px solid #e0e0e0" }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
            Video {index + 1}: {video.title}
          </Typography>

          <Box
            sx={{
              height: 200,
              bgcolor: "#f0f0f0",
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1,
            }}
          >
            <Typography variant="body2">Video placeholder</Typography>
          </Box>

          <Typography variant="subtitle1" fontWeight="bold">
            Quick Survey
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Please share your thoughts after watching this video:
          </Typography>

          {video.questions.map((question) => {
            const questionKey = `${video.id}-${question.id}`;
            return (
              <Box key={question.id} sx={{ mb: 2 }}>
                <Box
                  onClick={() => handleExpandSurvey(video.id, question.id)}
                  sx={{
                    p: 1,
                    border: "1px solid #ddd",
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f9f9f9" },
                  }}
                >
                  <Typography variant="body2">{question.text}</Typography>
                  <ExpandMoreIcon
                    sx={{
                      transform:
                        expandedSurvey[video.id] === question.id
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </Box>

                {expandedSurvey[video.id] === question.id && (
                  <Box
                    sx={{ mt: 1, p: 2, bgcolor: "#fafafa", borderRadius: 1 }}
                  >
                    {question.textInput ? (
                      <Box sx={{ position: "relative" }}>
                        <TextField
                          fullWidth
                          multiline
                          rows={3}
                          value={feedback[questionKey] || ""}
                          onChange={(e) =>
                            handleFeedbackChange(
                              video.id,
                              question.id,
                              e.target.value
                            )
                          }
                          placeholder="Type your answer here..."
                        />
                        <IconButton
                          size="small"
                          sx={{ position: "absolute", right: 8, top: 8 }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ) : (
                      <FormControl fullWidth>
                        <Select
                          displayEmpty
                          value={feedback[questionKey] || ""}
                          onChange={(e) =>
                            handleFeedbackChange(
                              video.id,
                              question.id,
                              e.target.value
                            )
                          }
                          renderValue={(selected) =>
                            selected || "Select an option"
                          }
                        >
                          <MenuItem value="">
                            <em>Select an option</em>
                          </MenuItem>
                          {question.options.map((option, idx) => (
                            <MenuItem key={idx} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </Box>
                )}
              </Box>
            );
          })}

          {isCurrentVideo(index) && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              disabled={!isFeedbackComplete(video) || submitting}
              onClick={() => handleSubmitFeedback(video.id)}
              sx={{ mt: 2 }}
            >
              {submitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          )}
        </Box>
      ))}

      {completedVideos.length === videos.length && (
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
          Book Now
        </Button>
      )}
    </Box>
  );
};

export default Videos;
