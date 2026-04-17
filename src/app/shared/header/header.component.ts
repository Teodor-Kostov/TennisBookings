import { CommonModule, AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-header',
  imports: [CommonModule, AsyncPipe, RouterLink, AvatarModule, BadgeModule, MenubarModule, InputTextModule, RippleModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true

})
export class HeaderComponent implements OnInit {
    private authService = inject(AuthService);
    items: MenuItem[] | undefined;
    user$ = this.authService.user$;

    ngOnInit() {
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                routerLink: '/home'
            },
            {
                label: 'Admin Menu',
                icon: 'pi pi-home',
            },
            {
                label: 'Menu',
                icon: 'pi pi-search',
                items: [
                    {
                        label: 'My Bookings',
                        icon: 'pi pi-bolt',
                        routerLink: '/my-bookings'
                    },
                    {
                        label: 'Book a Court',
                        icon: 'pi pi-server',
                        routerLink: '/slots'
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'UI Kit',
                        icon: 'pi pi-pencil',
                    }
                ]
            }
        ];
    }
}


