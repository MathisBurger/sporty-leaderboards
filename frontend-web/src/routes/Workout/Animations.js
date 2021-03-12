
// switches color and text of button
export function SwitchColorAndText() {
    let button = document.getElementById('workout-start-button');
    let color = window.getComputedStyle(button, null).getPropertyValue('background-color');
    if (color === "rgb(7, 89, 214)")  {
        button.style.animationName = 'slideToRed';
        button.style.animationFillMode = 'forwards';
        button.style.animationDuration = '0.3s';
        button.innerHTML = "stop";
    } else {
        button.style.animationName = 'slideToBlue';
        button.style.animationFillMode = 'forwards';
        button.style.animationDuration = '0.3s';
        button.innerHTML = "start";
    }
}
