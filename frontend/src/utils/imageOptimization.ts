// Image optimization utilities

/**
 * Preload critical images for better performance
 */
export const preloadImage = (src: string, priority: 'high' | 'low' = 'high') => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  if (priority === 'high') {
    link.setAttribute('fetchpriority', 'high');
  }
  document.head.appendChild(link);
};

/**
 * Lazy load background images
 */
export const lazyLoadBackgroundImage = (element: HTMLElement, imageUrl: string) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        element.style.backgroundImage = `url(${imageUrl})`;
        observer.unobserve(element);
      }
    });
  });
  
  observer.observe(element);
};

/**
 * Get responsive image sizes
 */
export const getResponsiveImageSizes = () => ({
  mobile: '(max-width: 768px) 100vw',
  tablet: '(max-width: 1024px) 50vw',
  desktop: '33vw'
});

