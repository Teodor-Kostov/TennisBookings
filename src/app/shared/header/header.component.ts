import { CommonModule, AsyncPipe } from '@angular/common';
import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule, Menu } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../auth/auth.service';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-header',
  imports: [CommonModule, AsyncPipe, RouterLink, AvatarModule, BadgeModule, MenubarModule, MenuModule, InputTextModule, RippleModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true

})
export class HeaderComponent implements OnInit {
    private authService = inject(AuthService);
    private router = inject(Router);

    @ViewChild('avatarMenu') avatarMenu!: Menu;

    items: MenuItem[] | undefined;
    avatarMenuItems: MenuItem[] | undefined;
    user$ = this.authService.user$;
    admin$ = this.authService.admin$;

    ngOnInit() {
        // Subscribe to both user and admin changes
        combineLatest([this.user$, this.admin$]).subscribe(([user, isAdmin]) => {
            this.updateMenuItems(!!user, isAdmin);
        });

        this.avatarMenuItems = [
            {
                label: 'Profile',
                icon: 'pi pi-user',
                routerLink: '/profile'
            },
            {
                separator: true
            },
            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                command: () => this.logout()
            }
        ];
    }

    private updateMenuItems(isLoggedIn: boolean, isAdmin: boolean) {
        if (isLoggedIn) {

            const menuItems: MenuItem[] = [
                {
                    label: 'Home',
                    icon: 'pi pi-home',
                    routerLink: '/home'
                }
            ];


            if (isAdmin) {
                menuItems.push({
                    label: 'Admin Menu',
                    icon: 'pi pi-cog',
                    items: [
                        {
                            label: 'Manage Courts',
                            icon: 'pi pi-list',
                            routerLink: '/courts'
                        },
                        {
                            separator: true
                        },
                        {
                            label: 'Add Court',
                            icon: 'pi pi-plus',
                            routerLink: '/courts/add'
                        }
                    ]
                });
            }

            //normal user
            menuItems.push({
                label: 'Menu',
                icon: 'pi pi-search',
                items: [
                    {
                        label: 'My Bookings',
                        icon: 'pi pi-bolt',
                        routerLink: '/my-bookings'
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'Book a Court',
                        icon: 'pi pi-server',
                        routerLink: '/slots'
                    }
                ]
            });

            this.items = menuItems;
        } else {
            //guest
            this.items = [
                {
                    label: 'Home',
                    icon: 'pi pi-home',
                    routerLink: '/home'
                }
            ];
        }
    }

    toggleAvatarMenu(event: Event) {
        this.avatarMenu.toggle(event);
    }

    logout() {
        this.authService.logout().subscribe({
            next: () => {
                this.router.navigate(['/home']);
            },
            error: (err) => {
                console.error('Logout failed', err);
            }
        });
    }
}


