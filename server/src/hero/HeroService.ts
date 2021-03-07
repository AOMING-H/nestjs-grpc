import { Injectable } from '@nestjs/common';
import {
    GrpcMethod,
    GrpcStreamMethod,
} from '@nestjs/microservices';
import { Observable, Subject } from 'rxjs';
import { HeroById } from './interfaces/hero-by-id.interface';
import { Hero } from './interfaces/hero.interface';

@Injectable()
export class HeroService {
    private readonly items: Hero[] = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Doe' },
    ];

    // 官网说明: we use the @GrpcMethod() decorator in a controller
    // 这个注解看起来只在controller生效, 实际上只要@Module指定本类为controllers即可生效
    // 就如本例所示, 实际上读取这个类的信息应该是在@Module中执行的
    // @GrpcStreamMethod 同理
    @GrpcMethod('HeroService')
    findOne(data: HeroById): Hero {
        return this.items.find(({ id }) => id === data.id);
    }

    @GrpcStreamMethod('HeroService')
    findMany(data$: Observable<HeroById>): Observable<Hero> {
        const hero$ = new Subject<Hero>();

        const onNext = (heroById: HeroById) => {
            const item = this.items.find(({ id }) => id === heroById.id);
            hero$.next(item);
        };
        const onComplete = () => hero$.complete();
        data$.subscribe(onNext, null, onComplete);

        return hero$.asObservable();
    }
}
