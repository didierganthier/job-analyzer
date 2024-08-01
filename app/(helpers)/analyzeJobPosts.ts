const analyzeJobPosts = (posts: string[]): Record<number, number> => {
    // Create a dictionary to store the results
    const results: Record<number, number> = {};
  
    // Loop through each job post
    posts.forEach((post) => {
      // Use a regular expression to extract the years of experience requirement
      const yearsPattern = /\b(\d+)\s*(?:to\s*)?(?:\+)?\s*years?/i;
      const yearsMatch = post.match(yearsPattern);
  
      // If a match is found, store the minimum number of years in the results dictionary
      if (yearsMatch) {
        const minYears = parseInt(yearsMatch[1], 10);
        if (!results[minYears]) {
          results[minYears] = 0;
        }
        results[minYears] += 1;
      }
    });
  
    // Return the results
    return results;
  };
  
  export default analyzeJobPosts;
  