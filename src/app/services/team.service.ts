import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Member, TeamData } from '../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private membersSubject = new BehaviorSubject<Member[]>([]);
  public members$ = this.membersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadTeamData();
  }

  private loadTeamData(): void {
    this.http.get<TeamData>('assets/team.json').subscribe({
      next: (data) => {
        this.membersSubject.next(data.members);
      },
      error: (error) => {
        console.error('Error loading team data:', error);
        // Fallback data in case of error
        const fallbackMembers: Member[] = [
          {
            id: 'NasserA',
            name: ' أبو تكتيك',
            image: 'assets/Nassoo.JPG',
            description: 'العقل المدبر وسط الفوضى، يضحك الجميع لكنه يخطط بصمت! قائد الظل وصاحب النكتة المميتة. 😏',
            specialty: 'زعيم الفريق وكاريزما بلا حدود',
            joinDate: '2020-01-01',
            lateDate: '2020-01-02'
          },
          {
            id: 'husain',
            name: 'حسين المتأخر',
            image: 'assets/Huss.jpeg',
            description: 'خبير في فن التأخير والوصول في اللحظة الأخيرة!',
            specialty: 'متأخر محترف',
            joinDate: '2020-01-01',
            lateDate: '2020-01-02'
          },
          {
            id: 'hamood',
            name: 'حمود النعسان',
            image: 'assets/WhatsApp Image 2025-07-26 at 19.50.41.jpeg',
            description: 'بطل النوم العالمي! يستطيع النوم في أي مكان وأي وقت.',
            specialty: 'نائم دائمًا',
            sleepQuotes: [
              'لا، ما صحيت بعد... أعطني خمس دقائق أخرى',
              'أنا صاحي ولكن عيوني تستريح',
              'النوم عبادة وأنا مؤمن جداً'
            ]
          },
          {
            id: 'mohammed',
            name: 'محمد الحكيم',
            image: 'assets/Moh.png',
            description: 'الفيلسوف الرسمي للفريق! يحول أي محادثة بسيطة إلى نقاش فلسفي عميق.',
            specialty: 'حكيم الفريق'
          },
          {
            id: 'nasser',
            name: 'ناصر المرح',
            image: 'assets/WhatsApp Image 2025-07-26 at 19.49.34.jpeg',
            description: 'كوميديان الفريق الرسمي! يحول كل موقف محرج إلى ضحكة.',
            specialty: 'صانع الضحكات'
          },
           {
            id: 'dream',
            name: 'حلم الفريق',
            image: 'assets/dream.jpeg',
            description: 'كوميديان الفريق الرسمي! يحول كل موقف محرج إلى ضحكة.',
            specialty: 'صانع الضحكات'
          }
        ];
        this.membersSubject.next(fallbackMembers);
      }
    });
  }

  getMembers(): Observable<Member[]> {
    return this.members$;
  }

  getMemberById(id: string): Observable<Member | undefined> {
    return new Observable(observer => {
      this.members$.subscribe(members => {
        const member = members.find(m => m.id === id);
        observer.next(member);
        observer.complete();
      });
    });
  }
}
