import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(
      <App/>
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

/*
Pattern image resposnive
.container {
  width: 50%;
  height: 200px;
  overflow: hidden;
}

.container img {
  max-width: 100%;
  height: auto;
  display: block;
}
image-container {
  overflow: hidden;
}

.image-container img {
  max-width:100%;
  height: auto;
  display: block;
}*/
