import HoverCarousel from "hover-carousel";
import "../carousel.css"

const MyImageCarousel = () => {
  const images = [
    'https://picsum.photos/id/75/1200/300',
    'https://picsum.photos/id/107/1200/300',
    'https://picsum.photos/id/517/1200/300',
    'https://picsum.photos/id/729/1200/300',
    'https://picsum.photos/id/1080/1200/300',
    
    
    // Add more image URLs here
  ];

  return (
    <div >
      <HoverCarousel images={images} />
    </div>
  );
};

export default MyImageCarousel;