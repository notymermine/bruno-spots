# BrunoSpots - Brown Study & Chill Finder
## Overview
BrunoSpots is a React app I developed to help Brown students find libraries, quiet study corners, collaborative spaces, and cafes across campus. Students can filter spaces by noise level, the availability of charging outlets, and the building accessibility in late night. Students can also save their favorite spots and roll a random recommendation for the study spot.

## How to Run It
1. git clone https://github.com/notymermine/bruno-spots.git
2. cd bruno-spots
3. npm install
4. npm run dev
5. Open http://localhost:5173 (or the URL shown in your terminal) in your browser.

## Personal Contribution
I built BrunoSpots using React, TypeScript, and a bit of Tailwind CSS as a fully client-side application without any backend functions. I structured the UI around a <SpotCard />  child component that receives spot details, favourite statues, and click callbacks through props. I stored the raw filter parameters (category, searchQuery, and boolean) in useState and derived the displayed spots on each render cycle using Array.prototype.filter(). For user interactions, I added a bookmarking system that updates an array of IDs using the spread operator [...prev, id] and .filter(). There is also a 'Surprise Me' function that randomly samples a spot using Math.floor(Math.random() * pool.length)and navigates the location to it using scrollIntoView({ behavior: 'smooth' }).

## Challenges & What I Learned
Developing BrunoSpots let me have a much better understanding of state management in React. My main challenge was coordinating multiple filters at the same time, especially when I tried to handle a search query while having 'Outlets' or 'Saved Only' toggled on. At first, I made the mistake of storing both the full spot list and the filtered list in two separate useState variables. Whenever a filter changed, I had to manually update the second state, which quickly caused bugs when filters were reset. I solved this by removing the second state completely, keeping only the active filters (strings and booleans) in state, and using .filter() to compute filteredSpots on each render. This eliminated the bugs and simplified the code, and I learned about the importance of avoiding redundant states in React.

## References
React Documentation (Hooks, Props, Components);
Lucide React (Icons);
Tailwind CSS Documentation
