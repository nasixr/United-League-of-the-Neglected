import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TeamService } from '../../services/team.service';
import { Member } from '../../models/member.model';
import { TimeSincePipe } from '../../pipes/time-since.pipe';

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [CommonModule, RouterModule, TimeSincePipe],
  template: `
    <div class="member-container fade-in" *ngIf="member">
      <!-- Navigation -->
      <nav class="member-nav">
        <a routerLink="/" class="btn btn-secondary">← العودة للصفحة الرئيسية</a>
      </nav>

      <!-- Member Profile -->
      <div class="member-profile">
        <div class="member-image-section">
          <img [src]="member.image" [alt]="member.name" class="profile-image">
          <div class="image-overlay">
            <h1 class="member-title">{{ member.name }}</h1>
            <span class="member-badge">{{ member.specialty }}</span>
          </div>
        </div>

        <div class="member-content">
          <div class="member-description-card">
            <h2>📝 نبذة عن {{ member.name.split(' ')[0] }}</h2>
            <p class="member-description">{{ member.description }}</p>
          </div>

          <!-- Special Features for each member -->
          
          <!-- Hamood's Wake Up Button -->
          <div *ngIf="member.id === 'hamood'" class="special-feature hamood-feature">
            <h3>😴 حالة حمود الآن</h3>
            <button (click)="checkHamoodStatus()" class="btn btn-primary wake-btn">
              هل صحى حمود؟ 🤔
            </button>
            <div *ngIf="hamoodStatus" class="status-response" [class.just-woke]="hamoodStatus.includes('صحيت')">
              <p>{{ hamoodStatus }}</p>
            </div>
          </div>

          <!-- Hussein's Late Counter -->
          <div *ngIf="member.id === 'husain'" class="special-feature husain-feature">
            <h3>⏰ عداد التأخير</h3>
            <div class="late-counter">
              <p>حسين متأخر منذ:</p>
              <div class="time-display">
                {{ member.lateDate! | timeSince }}
              </div>
              <div class="late-stats">
                <div class="stat-item">
                  <span class="stat-number">{{ getLateMinutes() }}</span>
                  <span class="stat-label">دقيقة تأخير</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">{{ getLateDays() }}</span>
                  <span class="stat-label">يوم متأخر</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Mohammed's Wisdom -->
          <div *ngIf="member.id === 'mohammed'" class="special-feature mohammed-feature">
            <h3>🤔 حكمة محمد اليوم</h3>
            <div class="wisdom-card">
              <p class="wisdom-text">"{{ getTodayWisdom() }}"</p>
              <button (click)="getNewWisdom()" class="btn btn-success">حكمة جديدة 💡</button>
            </div>
          </div>

          <!-- Nasser's Joke -->
          <div *ngIf="member.id === 'nasser'" class="special-feature nasser-feature">
            <h3>😂 نكتة ناصر المفضلة</h3>
            <div class="joke-card">
              <p class="joke-text">{{ getTodayJoke() }}</p>
              <button (click)="getNewJoke()" class="btn btn-success">نكتة أخرى 🤣</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div *ngIf="!member" class="loading-container">
      <div class="loading-spinner"></div>
      <p>جارٍ تحميل معلومات العضو...</p>
    </div>
  `,
  styles: [`
    .member-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .member-nav {
      max-width: 1200px;
      margin: 0 auto 30px;
    }

    .btn-secondary {
      background: rgba(255,255,255,0.9);
      color: #333;
      backdrop-filter: blur(10px);
    }

    .member-profile {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: start;
    }

    .member-image-section {
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      height: 500px;
    }

    .profile-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .image-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
      padding: 40px 30px;
      color: white;
    }

    .member-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 10px;
    }

    .member-badge {
      background: linear-gradient(45deg, #ff6b6b, #ffd93d);
      padding: 8px 20px;
      border-radius: 25px;
      font-weight: 600;
      font-size: 1rem;
    }

    .member-content {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    .member-description-card {
      background: white;
      padding: 30px;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }

    .member-description-card h2 {
      color: #333;
      font-size: 1.8rem;
      margin-bottom: 20px;
      font-weight: 600;
    }

    .member-description {
      color: #666;
      line-height: 1.8;
      font-size: 1.1rem;
    }

    .special-feature {
      background: white;
      padding: 30px;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }

    .special-feature h3 {
      color: #333;
      font-size: 1.5rem;
      margin-bottom: 20px;
      font-weight: 600;
    }

    /* Hamood's Wake Up Feature */
    .hamood-feature .wake-btn {
      font-size: 1.2rem;
      padding: 15px 30px;
      margin-bottom: 20px;
    }

    .status-response {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 15px;
      border-right: 4px solid #007bff;
      animation: slideIn 0.5s ease-out;
    }

    .status-response.just-woke {
      border-right-color: #28a745;
      background: #d4edda;
    }

    .status-response p {
      margin: 0;
      font-size: 1.1rem;
      color: #333;
    }

    /* Hussein's Late Counter */
    .late-counter {
      text-align: center;
    }

    .time-display {
      background: linear-gradient(45deg, #ff6b6b, #ee5a24);
      color: white;
      padding: 20px;
      border-radius: 15px;
      font-size: 1.5rem;
      font-weight: 700;
      margin: 20px 0;
    }

    .late-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-top: 20px;
    }

    .stat-item {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 15px;
      text-align: center;
    }

    .stat-number {
      display: block;
      font-size: 2rem;
      font-weight: 700;
      color: #ff6b6b;
    }

    .stat-label {
      font-size: 0.9rem;
      color: #666;
    }

    /* Mohammed's Wisdom */
    .wisdom-card, .joke-card {
      background: #f8f9fa;
      padding: 25px;
      border-radius: 15px;
      text-align: center;
    }

    .wisdom-text, .joke-text {
      font-size: 1.2rem;
      color: #333;
      font-style: italic;
      margin-bottom: 20px;
      line-height: 1.6;
    }

    /* Loading State */
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      color: white;
    }

    .loading-spinner {
      width: 50px;
      height: 50px;
      border: 4px solid rgba(255,255,255,0.3);
      border-top: 4px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 20px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .member-profile {
        grid-template-columns: 1fr;
        gap: 20px;
      }
      
      .member-image-section {
        height: 300px;
      }
      
      .member-title {
        font-size: 2rem;
      }
      
      .late-stats {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class MemberComponent implements OnInit {
  member?: Member;
  hamoodStatus: string = '';
  currentWisdom: string = '';
  currentJoke: string = '';

  private wisdomQuotes = [
    'الحياة مثل البرمجة، إذا لم تعمل في المرة الأولى، جرب مرة أخرى',
    'النجاح هو أن تفشل مرتين وتنجح في الثالثة... أو الرابعة',
    'الوقت نسبي، خاصة عندما تكون متأخراً',
    'أفضل طريقة لحل المشاكل هي تجاهلها حتى تحل نفسها',
    'الحكمة الحقيقية هي معرفة أنك لا تعرف شيئاً... وهذا محبط جداً'
  ];

  private jokes = [
    'ليش الشاي البارد ما يحضر الاجتماعات؟ لأنه فقد حماسه! ☕',
    'إيش الفرق بين البرمجة والطبخ؟ في الطبخ إذا خربت الوصفة مش هتدمر الكمبيوتر! 💻',
    'ليش المبرمج دايماً متعب؟ لأنه عنده مشاكل مع النوم... والاستيقاظ... والحياة عموماً! 😴',
    'إيش اللي يخلي المبرمج سعيد؟ لما الكود يشتغل من أول مرة... بس هذا مستحيل! 🎉'
  ];

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.teamService.getMemberById(id).subscribe(member => {
        this.member = member;
        if (member?.id === 'mohammed') {
          this.currentWisdom = this.getTodayWisdom();
        }
        if (member?.id === 'nasser') {
          this.currentJoke = this.getTodayJoke();
        }
      });
    }
  }

  checkHamoodStatus(): void {
    if (this.member?.sleepQuotes) {
      const randomIndex = Math.floor(Math.random() * this.member.sleepQuotes.length);
      this.hamoodStatus = this.member.sleepQuotes[randomIndex];
    }
  }

  getTodayWisdom(): string {
    if (!this.currentWisdom) {
      const today = new Date().getDate();
      const index = today % this.wisdomQuotes.length;
      this.currentWisdom = this.wisdomQuotes[index];
    }
    return this.currentWisdom;
  }

  getNewWisdom(): void {
    const randomIndex = Math.floor(Math.random() * this.wisdomQuotes.length);
    this.currentWisdom = this.wisdomQuotes[randomIndex];
  }

  getTodayJoke(): string {
    if (!this.currentJoke) {
      const today = new Date().getDate();
      const index = today % this.jokes.length;
      this.currentJoke = this.jokes[index];
    }
    return this.currentJoke;
  }

  getNewJoke(): void {
    const randomIndex = Math.floor(Math.random() * this.jokes.length);
    this.currentJoke = this.jokes[randomIndex];
  }

  getLateMinutes(): number {
    if (!this.member?.lateDate) return 0;
    const lateDate = new Date(this.member.lateDate);
    const now = new Date();
    const diff = now.getTime() - lateDate.getTime();
    return Math.floor(diff / (1000 * 60));
  }

  getLateDays(): number {
    if (!this.member?.lateDate) return 0;
    const lateDate = new Date(this.member.lateDate);
    const now = new Date();
    const diff = now.getTime() - lateDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }
}