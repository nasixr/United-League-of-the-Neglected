import { Directive, ElementRef, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appSleepy]',
  standalone: true
})
export class SleepyDirective implements OnInit {
  @Input() appSleepy: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.appSleepy) {
      // Apply sleepy styles to Hamood's card
      this.el.nativeElement.style.backgroundColor = '#f5f5f5';
      this.el.nativeElement.style.opacity = '0.8';
      this.el.nativeElement.style.filter = 'grayscale(20%)';
      this.el.nativeElement.style.transition = 'all 0.3s ease';
      
      // Add a subtle pulse animation
      this.el.nativeElement.style.animation = 'sleepyPulse 3s infinite ease-in-out';
      
      // Add the animation keyframes to the document if not already added
      if (!document.querySelector('#sleepy-animation')) {
        const style = document.createElement('style');
        style.id = 'sleepy-animation';
        style.textContent = `
          @keyframes sleepyPulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.02); opacity: 0.6; }
          }
        `;
        document.head.appendChild(style);
      }
    }
  }
}