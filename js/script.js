// -----------------------------------OfferPage------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    initFiltering();
    initExpiryCheck();
    initCountdownTimers();
    initWishlist();
    initShareButtons();
    initPointsCalculator();
    initCoinCollection();
    initSorting();
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
    
    function updateCountdowns() {
        const now = new Date();
        
        // Update offer cards
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
    
    updateCountdowns();
    setInterval(updateCountdowns, 60000); // Update every minute
}

// Wishlist functionality
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
    
    // Wishlist buttons
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
                        createCoinAnimation(icon, 3);
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
                createCoinAnimation(this, 3);
                
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

function initPointsCalculator() {
    const calculateButton = document.getElementById('calculate-points');
    const bookingAmountInput = document.getElementById('booking-amount');
    const pointsResult = document.getElementById('points-result');
    
    calculateButton.addEventListener('click', function() {
        const amount = parseFloat(bookingAmountInput.value);
        
        if (isNaN(amount) || amount <= 0) {
            pointsResult.textContent = 'Please enter a valid amount';
            pointsResult.style.color = '#ff6b6b';
            return;
        }
        
        const points = Math.floor(amount / 100) * 10;
        pointsResult.textContent = `You'll earn ${points.toLocaleString()} points! 🎯`;
        pointsResult.style.color = '#ffd700';
        
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
    
    bookingAmountInput.addEventListener('focus', function() {
        this.style.transform = 'scale(1.02)';
        this.style.borderColor = '#ffd700';
    });
    
    bookingAmountInput.addEventListener('blur', function() {
        this.style.transform = 'scale(1)';
        const amount = parseFloat(this.value);
        if (isNaN(amount) || amount <= 0) {
            this.style.borderColor = '#ff6b6b';
        } else {
            this.style.borderColor = '#28a745';
        }
    });
    
    bookingAmountInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateButton.click();
        }
    });
}
function initCoinCollection() {
    const collectButton = document.getElementById('collect-points');
    const pointsCountElement = document.getElementById('points-count');
    let points = 2779;
    
    const savedPoints = localStorage.getItem('moonrailPoints');
    if (savedPoints) {
        points = parseInt(savedPoints);
        pointsCountElement.textContent = points.toLocaleString();
    }
    
    collectButton.addEventListener('click', function() {
        const newPoints = Math.floor(Math.random() * 41) + 10;
        points += newPoints;
        pointsCountElement.textContent = points.toLocaleString();
        
        localStorage.setItem('moonrailPoints', points.toString());
        
        createCoinAnimation(this, 12, newPoints);
        
        showNotification(`+${newPoints} points collected! 🎉`);
        
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        this.disabled = true;
        this.innerHTML = '<i class="fas fa-clock"></i> Come back later';
        this.style.background = '#ccc';
        this.style.color = '#666';
        
        setTimeout(() => {
            this.disabled = false;
            this.innerHTML = '<i class="fas fa-gift"></i> Collect Points';
            this.style.background = '';
            this.style.color = '';
        }, 30000);
    });
}

function createCoinAnimation(element, coinCount = 5, points = 0) {
    const coinContainer = document.getElementById('coin-container');
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < coinCount; i++) {
        const coin = document.createElement('div');
        coin.className = 'coin';
        
 
        if (points > 0) {
            coin.textContent = `+${Math.floor(points/coinCount)}`;
            coin.style.background = 'linear-gradient(45deg, #ffd700, #ffed4e)';
        } else {
            const emojis = ['❤️'];
            coin.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            coin.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
        }
        const startX = rect.left + (Math.random() * rect.width);
        const startY = rect.top + (Math.random() * rect.height);
        
        coin.style.left = startX + 'px';
        coin.style.top = startY + 'px';
      
        const duration = 1.2 + Math.random() * 0.8;
        const delay = Math.random() * 0.5;
        const rotation = Math.random() * 720 + 360; 
        
        coin.style.animation = `coinFly ${duration}s ease-in ${delay}s forwards`;
        coin.style.setProperty('--rotation', `${rotation}deg`);
        
        coinContainer.appendChild(coin);
        
        setTimeout(() => {
            if (coin.parentNode) {
                coin.remove();
            }
        }, (duration + delay) * 1000);
    }
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

const coinAnimationStyle = document.createElement('style');
coinAnimationStyle.textContent = `
    @keyframes coinFly {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(var(--rotation, 360deg));
            opacity: 0;
        }
    }
    
    .notification {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(coinAnimationStyle);

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

document.addEventListener('DOMContentLoaded', initScrollAnimations);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('booking-modal');
        if (modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    if (e.key === 'Enter' && document.activeElement.id === 'booking-amount') {
        document.getElementById('calculate-points').click();
    }
});

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
    collectPoints: function() { document.getElementById('collect-points').click(); },
    calculatePoints: function(amount) {
        document.getElementById('booking-amount').value = amount;
        document.getElementById('calculate-points').click();
    },
    sortOffers: sortOffers,
    showNotification: showNotification
};