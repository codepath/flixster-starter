deployed Link = [https://flixster-starter-l0cd.onrender.com]

## Unit Assignment: Flixster

Submitted by: **Jennifer Obinwanne**

Estimated time spent: **36+** hours spent in total

Deployed Application (**required**): [Flixster Deployed Site](https://flixster-starter-l0cd.onrender.com)

### Application Features

#### REQUIRED FEATURES

- [x] **Display Movies**
  - [x] Users can view a list of current movies from The Movie Database API in a grid view.
    - [x] Movie tiles should be reasonably sized (at least 6 playlists on your laptop when full screen; large enough that the playlist components detailed in the next feature are legible).
  - [x] For each movie displayed, users can see the movie's:
    - [x] Title
    - [x] Poster image
    - [x] Vote average
  - [x] Users can load more current movies by clicking a button which adds more movies to the grid without reloading the entire page.
- [x] **Search Functionality**
  - [x] Users can use a search bar to search for movies by title.
  - [x] The search bar should include:
    - [x] Text input field
    - [x] Submit/Search button
    - [ ] Clear button
  - [x] Movies with a title containing the search query in the text input field are displayed in a grid view when the user either:
    - [x] Presses the Enter key
    - [x] Clicks the Submit/Search button
  - [ ] Users can click the Clear button. When clicked:
    - [ ] Most recent search results are cleared from the text input field and the grid view and all current movies are displayed in a grid view
- [x] **Design Features**
  - [x] Website implements all of the following accessibility features:
    - [x] Semantic HTML
    - [x] [Color contrast](https://webaim.org/resources/contrastchecker/)
    - [x] Alt text for images
  - [x] Website implements responsive web design.
    - [x] Uses CSS Flexbox or CSS Grid
    - [x] Movie tiles and images shrink/grow in response to window size
  - [x] Users can click on a movie tile to view more details about a movie in a pop-up modal.
    - [x] The pop-up window is centered in the screen and does not occupy the entire screen.
    - [x] The pop-up window has a shadow to show that it is a pop-up and appears floating on the screen.
    - [x] The backdrop of the pop-up appears darker or in a different shade than before. including:
    - [x] The pop-up displays additional details about the movie including:
      - [x] Runtime in minutes
      - [x] Backdrop poster
      - [x] Release date
      - [x] Genres
      - [x] An overview
  - [x] Users can use a drop-down menu to sort movies.
    - [x] Drop-down allows movies to be sorted by:
      - [x] Title (alphabetic, A-Z)
      - [x] Release date (chronologically, most recent to oldest)
      - [x] Vote average (descending, highest to lowest)
    - [x] When a sort option is clicked, movies display in a grid according to selected criterion.
  - [x] Website displays:
    - [x] Header section
    - [x] Banner section
    - [x] Search bar
    - [x] Movie grid
    - [x] Footer section
    - [x] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: To ease the grading process, please use the [color contrast checker](https://webaim.org/resources/contrastchecker/) to demonstrate to the grading team that text and background colors on your website have appropriate contrast. The Contrast Ratio should be above 4.5:1 and should have a green box surrounding it.
  - [x] **Deployment**
  - [x] Website is deployed via Render.
  - [x] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: For ease of grading, please use the deployed version of your website when creating your walkthrough.

#### STRETCH FEATURES

- [x] **Embedded Movie Trailers**
  - [x] Within the pop-up modal displaying a movie's details, the movie trailer is viewable.
    - [x] When the trailer is clicked, users can play the movie trailer.
- [x] **Favorite Button**
  - [x] For each movie displayed, users can favorite the movie.
  - [x] There should be visual element (such as a heart icon) on each movie's tile to show whether or not the movie has been favorited.
  - [x] If the movie is not favorited:
    - [x] Clicking on the visual element should mark the movie as favorited
    - [x] There should be visual feedback (such as the heart turning a different color) to show that the movie has been favorited by the user.
  - [x] If the movie is already favorited:
    - [x] Clicking on the visual element should mark the movie as _not_ favorited.
    - [x] There should be visual feedback (such as the heart turning a different color) to show that the movie has been unfavorited.
- [x] **Watched Checkbox**
  - [x] For each movie displayed, users can mark the movie as watched.
  - [x] There should be visual element (such as an eye icon) on each movie's tile to show whether or not the movie has been watched.
  - [x] If the movie has not been watched:
    - [x] Clicking on the visual element should mark the movie as watched
    - [x] There should be visual feedback (such as the eye turning a different color) to show that the movie has been watched by the user.
  - [x] If the movie is already watched:
    - [x] Clicking on the visual element should mark the movie as _not_ watched.
    - [x] There should be visual feedback (such as the eye turning a different color) to show that the movie has not been watched.
- [x] **Sidebar**
  - [x] The website includes a side navigation bar.
  - [x] The sidebar has three pages:
    - [x] Home
    - [x] Favorites
    - [x] Watched
  - [x] The Home page displays all current movies in a grid view, the search bar, and the sort movies drop-down.
  - [x] The Favorites page displays all favorited movies in a grid view.
  - [x] The Watched page displays all watched movies in a grid view.
     
        

### Image display
![image](https://github.com/user-attachments/assets/525a3462-506c-4cd6-a459-2e75b892e8d7)
![image](https://github.com/user-attachments/assets/67347613-abe0-4758-bf96-6b288cba1343)


### Walkthrough Video

`TODO://` (https://www.loom.com/share/26f53bf9a2ec427f91070bd75caaae84).

`ADD_EMBEDDED_CODE_HERE`

### Reflection

- Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

Yes, the labs definitely laid the foundation I needed to build the core of this project. Topics like using props, lifting state, conditional rendering, and React hooks were all essential in helping me navigate the dynamic behaviors of this project. However, the sidebar navigation stretch feature was definitely more complex than what we directly covered. It pushed me to learn more about conditional rendering, component structure, and view toggling in React.

- If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.

If I had more time, I would’ve implemented local storage or a persistent backend so users' favorite and watched movies don’t reset on refresh. I also would've loved to experiment with animations—for example, smooth transitions between views, or slight scaling effects when hovering over movie tiles to make the interface feel more interactive and modern.

- Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

I was really happy with how the core functionality came together in the demo—especially being able to embed trailers and switch between views using the sidebar. The modal pop-up also felt clean and polished. One thing I saw others do that I’d love to try next time is integrating a theme switcher (light/dark mode) and possibly using a component library to speed up UI development without starting from scratch every time.

### Open-source libraries used

- [The Movie Database (TMDb) API](https://developer.themoviedb.org/)
- [YouTube API for trailers](https://developers.google.com/youtube/v3)

### Shout out

Shout out to Codepath TAs and my peers who helped me debug the sidebar logic! 🙌🏽
