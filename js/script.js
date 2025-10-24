// -----------------------------------OfferPage------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    initFiltering();
    initExpiryCheck();
    initCountdownTimers();
    initWishlist();
    initShareButtons();
    initSorting();
    initScrollAnimations();
});

function initFiltering() {
    const filterItems = document.querySelectorAll('.offer-nav-item');
    const offerCards = document.querySelectorAll('.offer-card');
    
    filterItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
           
            filterItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            offerCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function initExpiryCheck() {
    const today = new Date();
   
    const offerCards = document.querySelectorAll('.offer-card');
    offerCards.forEach(card => {
        const expiryDate = new Date(card.getAttribute('data-expiry'));
        
        if (expiryDate < today) {
            card.classList.add('expired');
            const button = card.querySelector('.btn');
            if (button) {
                button.textContent = 'Expired';
                button.disabled = true;
                button.style.background = '#ccc';
                button.style.cursor = 'not-allowed';
            }
            const expiredBadge = document.createElement('div');
            expiredBadge.className = 'expired-badge';
            expiredBadge.textContent = 'EXPIRED';
            card.appendChild(expiredBadge);
        }
    });
    const rewardCards = document.querySelectorAll('.reward-card');
    rewardCards.forEach(card => {
        const expiryDate = new Date(card.getAttribute('data-expiry'));
        
        if (expiryDate < today) {
            card.classList.add('expired');
            const button = card.querySelector('.btn');
            if (button) {
                button.textContent = 'Expired';
                button.disabled = true;
                button.style.background = '#ccc';
                button.style.cursor = 'not-allowed';
            }
            const expiredBadge = document.createElement('div');
            expiredBadge.className = 'expired-badge';
            expiredBadge.textContent = 'EXPIRED';
            card.appendChild(expiredBadge);
        }
    });
}

// Countdown timers
function initCountdownTimers() {
    const offerCards = document.querySelectorAll('.offer-card');
    const rewardCards = document.querySelectorAll('.reward-card');
    
    //update offer car
    function updateCountdowns() {
        const now = new Date();
        offerCards.forEach(card => {
            const expiryDate = new Date(card.getAttribute('data-expiry'));
            const timeDiff = expiryDate - now;
            
            if (timeDiff > 0 && !card.classList.contains('expired')) {
                const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                
                let countdownElement = card.querySelector('.countdown-timer');
                if (!countdownElement) {
                    countdownElement = document.createElement('div');
                    countdownElement.className = 'countdown-timer';
                    card.appendChild(countdownElement);
                }
                
                if (days <= 1) {
                    countdownElement.textContent = `${hours}h left`;
                    countdownElement.className = 'countdown-timer urgent';
                } else if (days <= 7) {
                    countdownElement.textContent = `${days}d ${hours}h left`;
                    countdownElement.className = 'countdown-timer warning';
                } else {
                    countdownElement.textContent = `${days} days left`;
                    countdownElement.className = 'countdown-timer normal';
                }
            }
        });
        rewardCards.forEach(card => {
            const expiryDate = new Date(card.getAttribute('data-expiry'));
            const timeDiff = expiryDate - now;
            
            if (timeDiff > 0 && !card.classList.contains('expired')) {
                const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                
                let countdownElement = card.querySelector('.countdown-timer');
                if (!countdownElement) {
                    countdownElement = document.createElement('div');
                    countdownElement.className = 'countdown-timer';
                    card.appendChild(countdownElement);
                }
                
                if (days <= 7) {
                    countdownElement.textContent = `${days} days left`;
                    countdownElement.className = 'countdown-timer warning';
                } else {
                    countdownElement.textContent = `${days} days left`;
                    countdownElement.className = 'countdown-timer normal';
                }
            }
        });
    }
    
    //every min update
    updateCountdowns();
    setInterval(updateCountdowns, 60000);
}

// Wishlist
function initWishlist() {
    let wishlistCount = 0;
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    const wishlistIcons = document.querySelectorAll('.wishlist-icon');
    const wishlistCountElement = document.getElementById('wishlist-count');
    
    // Load wishlist from localStorage
    const savedWishlist = JSON.parse(localStorage.getItem('moonrailWishlist') || '[]');
    wishlistCount = savedWishlist.length;
    wishlistCountElement.textContent = wishlistCount;
    
    // Apply saved wishlist state
    savedWishlist.forEach(itemId => {
        const icon = document.querySelector(`[data-offer-id="${itemId}"]`);
        if (icon) {
            icon.classList.add('active');
            icon.innerHTML = '<i class="fas fa-heart"></i>';
        }
    });
    
    // Wishlist button
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            
            if (action === 'add-all') {
                const wishlistItems = [];
                wishlistIcons.forEach(icon => {
                    if (!icon.classList.contains('active')) {
                        const offerId = icon.getAttribute('data-offer-id') || Math.random().toString(36).substr(2, 9);
                        icon.setAttribute('data-offer-id', offerId);
                        icon.classList.add('active');
                        icon.innerHTML = '<i class="fas fa-heart"></i>';
                        wishlistCount++;
                        wishlistItems.push(offerId);
                    }
                });
              
                const currentWishlist = JSON.parse(localStorage.getItem('moonrailWishlist') || '[]');
                const updatedWishlist = [...new Set([...currentWishlist, ...wishlistItems])];
                localStorage.setItem('moonrailWishlist', JSON.stringify(updatedWishlist));
                
            } else if (action === 'view') {
                if (wishlistCount === 0) {
                    showNotification('Your wishlist is empty! 💔');
                } else {
                    showNotification(`You have ${wishlistCount} items in your wishlist! ❤️`);
                }
            }
            
            wishlistCountElement.textContent = wishlistCount;
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
   
    wishlistIcons.forEach(icon => {
        
        if (!icon.getAttribute('data-offer-id')) {
            const offerId = Math.random().toString(36).substr(2, 9);
            icon.setAttribute('data-offer-id', offerId);
        }
        
        icon.addEventListener('click', function() {
            const offerId = this.getAttribute('data-offer-id');
            let currentWishlist = JSON.parse(localStorage.getItem('moonrailWishlist') || '[]');
            
            if (this.classList.contains('active')) {
             
                this.classList.remove('active');
                this.innerHTML = '<i class="far fa-heart"></i>';
                wishlistCount--;
                currentWishlist = currentWishlist.filter(id => id !== offerId);
                showNotification('Removed from wishlist 💔');
            } else {
              
                this.classList.add('active');
                this.innerHTML = '<i class="fas fa-heart"></i>';
                wishlistCount++;
                currentWishlist.push(offerId);
                showNotification('Added to wishlist! ❤️');
            }
            
            localStorage.setItem('moonrailWishlist', JSON.stringify(currentWishlist));
            wishlistCountElement.textContent = wishlistCount;
        });
    });
}

function initShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.offer-card');
            const offerTitle = card.querySelector('h3').textContent;
            const offerDescription = card.querySelector('p').textContent;
            
            const shareText = `${offerTitle} - ${offerDescription} Check out this amazing travel offer from MoonRail!`;
            
            if (navigator.share) {
                navigator.share({
                    title: offerTitle,
                    text: shareText,
                    url: window.location.href
                }).then(() => {
                    showNotification('Offer shared successfully! 📤');
                }).catch(() => {
                    // User cancelled share, do nothing
                });
            } else {
                navigator.clipboard.writeText(`${shareText} ${window.location.href}`).then(() => {
                    showNotification('Offer link copied to clipboard! 📋');
                }).catch(() => {
                    showNotification('Failed to copy to clipboard ❌', 'error');
                });
            }
          
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)';
        notification.style.borderLeftColor = '#dc3545';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%) translateY(0)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

function initSorting() {
    const sortSelect = document.getElementById('sort-select');
    
    sortSelect.addEventListener('change', function() {
        sortOffers(this.value);
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
}

function sortOffers(criteria) {
    const grid = document.getElementById('offers-grid');
    const cards = Array.from(grid.querySelectorAll('.offer-card:not([style*="display: none"])'));
    if (cards.length === 0) {
        cards.push(...Array.from(grid.querySelectorAll('.offer-card')));
    }
    
    cards.sort((a, b) => {
        switch(criteria) {
            case 'expiry':
                return new Date(a.dataset.expiry) - new Date(b.dataset.expiry);
            case 'popularity':
                return parseInt(b.dataset.popularity) - parseInt(a.dataset.popularity);
            case 'savings':
                return parseInt(b.dataset.savings) - parseInt(a.dataset.savings);
            case 'price-low':
                const priceA = parsePrice(a.querySelector('.discounted-price').textContent);
                const priceB = parsePrice(b.querySelector('.discounted-price').textContent);
                return priceA - priceB;
            case 'price-high':
                const priceAHigh = parsePrice(a.querySelector('.discounted-price').textContent);
                const priceBHigh = parsePrice(b.querySelector('.discounted-price').textContent);
                return priceBHigh - priceAHigh;
            default:
                return 0;
        }
    });
 
    cards.forEach((card, index) => {
        setTimeout(() => {
            grid.appendChild(card);
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.transition = 'all 0.3s ease';
            }, 50);
        }, index * 50);
    });
}

function parsePrice(priceString) {
    return parseInt(priceString.replace(/[^\d]/g, '')) || 0;
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.offer-card, .reward-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('SW registered: ', registration);
        }).catch(function(registrationError) {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

window.MoonRail = {
    sortOffers: sortOffers,
    showNotification: showNotification
};
