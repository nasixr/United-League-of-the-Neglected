import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TeamService } from '../../services/team.service';
import { Member } from '../../models/member.model';
import { SleepyDirective } from '../../directives/sleepy.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, SleepyDirective],
  template: `
    <div class="home-container fade-in">
      <header class="hero-section">
        <h1 class="main-title bounce">🎭 فرقة المهملين المتحدة 🎭</h1>
<p class="hero-description" style="font-size: 1rem; font-weight: 300; color: #fff; line-height: 1.8; text-align: center; max-width: 1200px; margin: 20px auto; opacity: 0.95;">
  مرحباً بكم في أغرب فرقة في التاريخ! نحن مجموعة من الأصدقاء المهملين جداً الذين قرروا الاتحاد 
  لإثبات أن الإهمال فن وليس عيب. كل عضو فينا له موهبة خاصة في نوع معين من الإهمال، 
  وهذا ما يجعلنا فريقاً لا يُقهر... إذا تذكرنا أن نحضر للاجتماع! 😄
</p>

<p class="hero-description" style="font-size: 1.4rem; font-weight: 500; color: #fff; line-height: 2; text-align: center; max-width: 1200px; margin: 30px auto; opacity: 0.98;">
  من حسين الذي يتأخر دائماً، إلى حمود الذي ينام في كل مكان، 
  ومحمد الذي يسأل أسئلة فلسفية في كل مناسبة، وناصر الذي يحب إلقاء النكات، 
  نحن هنا لنقدم لكم تجربة فريدة من نوعها. 
  انضموا إلينا في هذه الرحلة المليئة بالضحك والإهمال، 
  واكتشفوا كيف يمكن للإهمال أن يكون ممتعاً!
</p>


<img src="assets/dream.jpeg" alt="Dream"
     style="max-width: 90%; height: 400px; border-radius: 20px; box-shadow: 30px 10px 20px rgba(5, 13, 25, 0.72); margin: 20px 0;">

      </header>

      <section class="members-section">
        <h2 class="section-title">🌟 أعضاء الفريق الرائعون 🌟</h2>
        
        <div class="members-grid">
          <div 
            *ngFor="let member of members" 
            class="member-card card"
            [appSleepy]="member.id === 'hamood'"
            [attr.data-member]="member.id"
          >
            <div class="member-image-container">
              <img [src]="member.image" [alt]="member.name" class="member-image">
              <div class="member-overlay">
                <span class="member-specialty">{{ member.specialty }}</span>
              </div>
            </div>
            
            <div class="member-info">
              <h3 class="member-name">{{ member.name }}</h3>
              <p class="member-description">{{ member.description }}</p>
              
              <div class="member-actions">
                <a [routerLink]="['/member', member.id]" class="btn btn-primary">
                  اكتشف المزيد عن {{ member.name.split(' ')[0] }} ←
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer class="fun-facts">
        <h3>🎉 حقائق ممتعة عن الفريق 🎉</h3>
        <ul class="facts-list">
          <li>⏰ إجمالي الوقت المتأخر فيه حسين: أكثر من 1000 ساعة</li>
          <li>😴 عدد ساعات نوم حمود اليومية: 18 ساعة (في المتوسط)</li>
          <li>🤔 عدد الأسئلة الفلسفية من محمد: لا نهائية</li>
          <li>😂 عدد النكت التي قالها ناصر: يفوق الحصر</li>
        </ul>
      </footer>

      <section class="photo-gallery">
        <h2 class="section-title">📸 معرض صور الفريق 📸</h2>
        <div class="gallery-grid">
          <div *ngFor="let member of members" class="gallery-item">
            <div class="gallery-image-container">
              <img [src]="member.image" [alt]="member.name" class="gallery-image">
              <div class="gallery-overlay">
                <h4>{{ member.name }}</h4>
                <p>{{ member.specialty }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #091238ff 0%, #764ba2 100%);
      padding: 20px 0;
    }

    .hero-section {
      text-align: center;
      padding: 60px 20px;
      color: white;
    }

    .main-title {
      font-size: 3rem;
      font-weight: 800;
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .hero-description {
      font-size: 1.2rem;
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.8;
      opacity: 0.95;
    }

    .members-section {
      padding: 40px 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-title {
      text-align: center;
      color: white;
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 40px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .members-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      padding: 20px 0;
    }

    .member-card {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      transition: all 0.3s ease;
      position: relative;
    }

    .member-card:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 25px 50px rgba(0,0,0,0.2);
    }

    .member-image-container {
      position: relative;
      height: 250px;
      overflow: hidden;
    }

    .member-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .member-card:hover .member-image {
      transform: scale(1.1);
    }

    .member-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.7));
      display: flex;
      align-items: flex-end;
      padding: 20px;
    }

    .member-specialty {
      background: linear-gradient(45deg, #ff6b6b, #ffd93d);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .member-info {
      padding: 25px;
    }

    .member-name {
      font-size: 1.5rem;
      font-weight: 700;
      color: #333;
      margin-bottom: 15px;
    }

    .member-description {
      color: #666;
      line-height: 1.6;
      margin-bottom: 20px;
      font-size: 0.95rem;
    }

    .member-actions {
      text-align: center;
    }

    .fun-facts {
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      margin: 40px 20px;
      padding: 40px;
      border-radius: 20px;
      color: white;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }

    .fun-facts h3 {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 30px;
      font-weight: 600;
    }

    .facts-list {
      list-style: none;
      font-size: 1.1rem;
      line-height: 2;
    }

    .facts-list li {
      padding: 10px 0;
      border-bottom: 1px solid rgba(255,255,255,0.2);
    }

    .facts-list li:last-child {
      border-bottom: none;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .main-title {
        font-size: 2rem;
      }
      
      .hero-description {
        font-size: 1rem;
      }
      
      .section-title {
        font-size: 2rem;
      }
      
      .members-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }
      
      .fun-facts {
        margin: 20px 10px;
        padding: 25px;
      }
    }

    /* Special styling for Hamood's card when sleepy directive is applied */
    .member-card[data-member="hamood"] {
      position: relative;
    }

    .member-card[data-member="hamood"]::after {
      content: "😴";
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 2rem;
      animation: float 2s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }

    /* Photo Gallery Styles */
    .photo-gallery {
      padding: 60px 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 40px;
    }

    .gallery-item {
      position: relative;
      border-radius: 15px;
      overflow: hidden;
      height: 300px;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .gallery-item:hover {
      transform: scale(1.05);
      box-shadow: 0 15px 35px rgba(0,0,0,0.3);
    }

    .gallery-image-container {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .gallery-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .gallery-item:hover .gallery-image {
      transform: scale(1.1);
    }

    .gallery-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
      color: white;
      padding: 20px;
      transform: translateY(100%);
      transition: transform 0.3s ease;
    }

    .gallery-item:hover .gallery-overlay {
      transform: translateY(0);
    }

    .gallery-overlay h4 {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 5px;
    }

    .gallery-overlay p {
      font-size: 0.9rem;
      opacity: 0.9;
    }
  `]
})
export class HomeComponent implements OnInit {
  members: Member[] = [];

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.getMembers().subscribe(members => {
      this.members = members;
    });
  }
}