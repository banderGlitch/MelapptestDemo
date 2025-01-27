export function shuffleQuestions(questions) {
    // Create a new object to store shuffled questions
    const shuffled = {};
    
    // For each level (easy, medium, hard)
    for (const level in questions) {
      // Get questions for current level and shuffle them
      shuffled[level] = questions[level]
        .slice() // Create a copy of the array
        .sort(() => Math.random() - 0.5); // Shuffle using sort with random comparison
    }
    
    return shuffled;
  }