# ES Homepage

[Visit the deployed homepage](https://es-homepage.vercel.app)

This is a Next.js based web application that fetches and displays sports news articles from a mock API. It features infinite scrolling, where additional articles are loaded automatically as the user scrolls down.

## Technologies Used

- [Next.js](https://nextjs.org/) 
- [React](https://reactjs.org/) 
- [React Query](https://react-query.tanstack.com/) 
- [SCSS](https://sass-lang.com/) 


## Key Components

- **Home Component**: Fetches the data from the API and renders the Header component and the InfiniteScrolling component. It also renders individual articles returned from the API.

- **InfiniteScrolling Component**: Handles the logic of infinite scrolling, fetching new data from the API when the user has scrolled to the bottom of the page.

- **FetchAPI Function**: Used to fetch data from the mock API.


## Run Locally

1. Clone this repository

```bash
git clone https://github.com/dakshgodara2001/ES_homepage.git
```

2. Install the dependencies

```bash
npm install
```


3. Start the development server

```bash
npm run dev
```

Visit http://localhost:3000 to view the application in the browser.


## Detecting Users Country

To accomplish this, we can use a geolocation API, to determine the user's country. And create a custom hook that returns the user's country using API. The Home component will uses this country to determine whether to use infinite scrolling or the "Read More" button.