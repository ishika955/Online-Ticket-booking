
document.querySelector('.menu-button').addEventListener('click', function() {
    const navMenu = document.querySelector('.navbar ul');
    navMenu.classList.toggle('active');
    this.classList.toggle('active');
});

document.querySelectorAll('.navbar ul li a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelector('.navbar ul').classList.remove('active');
        document.querySelector('.menu-button').classList.remove('active');
    });
});
