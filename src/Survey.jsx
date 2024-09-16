import React, { useState, useEffect } from "react";

const questions = [
  {
    id: 1,
    text: "How satisfied are you with our products?",
    type: "rating",
    scale: 5,
  },
  {
    id: 2,
    text: "How fair are the prices compared to similar retailers?",
    type: "rating",
    scale: 5,
  },
  {
    id: 3,
    text: "How satisfied are you with the value for money of your purchase?",
    type: "rating",
    scale: 5,
  },
  {
    id: 4,
    text: "On a scale of 1-10, how likely are you to recommend us to friends and family?",
    type: "rating",
    scale: 10,
  },
  { id: 5, text: "What can we do to improve our service?", type: "text" },
];

const Survey = () => {
  const [Ques, setQues] = useState(0);
  const [Ans, setAns] = useState({});
  const [Id, setId] = useState(null);
  const [Rating, setRating] = useState(null);

  useEffect(() => {
    const userId = () => {
      const counter = parseInt(localStorage.getItem("survey-counter"), 10) || 0;
      const newId = `user${counter + 1}`;
      localStorage.setItem("survey-counter", counter + 1);
      setId(newId);
      console.log(`Generated ID: ${newId}`);
    };

    userId();
  }, []);
  useEffect(() => {
    if (Id) {
      const savedAns = JSON.parse(localStorage.getItem(`survey-${Id}`)) || {};
      setAns(savedAns);
    }
  }, [Id]);

  const handleAns = (answer) => {
    const updatedAns = { ...Ans, [questions[Ques].id]: answer };
    setAns(updatedAns);
    setRating(answer); //
    localStorage.setItem(`survey-${Id}`, JSON.stringify(updatedAns));
  };

  const handleNext = () => {
    if (Ques < questions.length - 1) {
      setQues(Ques + 1);
      setRating(null);
    }
  };

  const handlePrev = () => {
    if (Ques > 0) {
      setQues(Ques - 1);
    }
  };

  const handleSubmit = () => {
    if (window.confirm("Do you want to submit the survey?")) {
      localStorage.setItem(`survey-${Id}-status`, "COMPLETED");
      alert("Thank you for your feedback!");
      window.location.href = "/";
    }
  };

  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "auto",
    padding: "auto",
    backgroundColor: "skyblue",
    borderRadius: "25px",
  };

  const titleStyle = {
    textAlign: "center",
    color: "white",
  };

  const questionStyle = {
    marginTop: "20px",
  };

  const questionTextStyle = {
    fontSize: "18px",
    marginBottom: "10px",
    color: "black",
  };

  const ratingButtonStyle = (index) => ({
    backgroundColor: Rating === index + 1 ? "red" : "black",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "10px 15px",
    cursor: "pointer",
    fontSize: "16px",
    margin: "2px",
  });

  const textAreaStyle = {
    width: "100%",
    height: "100px",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    resize: "vertical",
  };

  const navigationStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  };

  const navButtonStyle = {
    backgroundColor: "black",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
  };

  const submitStlyle = {
    backgroundColor: "black",
  };

  const navButtonHoverStyle = {
    backgroundColor: "green",
  };

  const submitHoverStyle = {
    backgroundColor: "red",
  };

  const counterStyle = {
    textAlign: "center",
    marginTop: "10px",
    color: "black",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Customer Survey</h1>
      {Ques < questions.length ? (
        <div style={questionStyle}>
          <h2 style={questionTextStyle}>{questions[Ques].text}</h2>
          {questions[Ques].type === "rating" ? (
            <div>
              {[...Array(questions[Ques].scale)].map((_, index) => (
                <button
                  key={index}
                  style={ratingButtonStyle(index)}
                  onClick={() => handleAns(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          ) : (
            <textarea
              style={textAreaStyle}
              placeholder="Your feedback"
              onBlur={(e) => handleAns(e.target.value)}
            />
          )}
          <div style={navigationStyle}>
            <button
              style={navButtonStyle}
              onClick={handlePrev}
              disabled={Ques === 0}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor =
                  navButtonHoverStyle.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor =
                  navButtonStyle.backgroundColor)
              }
            >
              Previous
            </button>
            {Ques === questions.length - 1 ? (
              <button
                style={{ ...navButtonStyle, ...submitStlyle }}
                onClick={handleSubmit}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor =
                    submitHoverStyle.backgroundColor)
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor =
                    submitStlyle.backgroundColor)
                }
              >
                Submit Survey
              </button>
            ) : (
              <button
                style={navButtonStyle}
                onClick={handleNext}
                disabled={Rating === null && questions[Ques].type === "rating"}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor =
                    navButtonHoverStyle.backgroundColor)
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor =
                    navButtonStyle.backgroundColor)
                }
              >
                Next
              </button>
            )}
          </div>
          <div style={counterStyle}>
            {Ques + 1} / {questions.length}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Survey;
