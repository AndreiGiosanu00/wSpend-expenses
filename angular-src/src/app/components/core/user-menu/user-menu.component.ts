import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {LoadingService} from "../../../services/loading.service";
import {AlertsService} from "../../../services/alerts.service";

declare let $: any;

@Component({
  selector: 'cdk-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
	isOpen: boolean = false;

  	//currentUser = null;
  	Hari;
  	

  	@Input() currentUser = null;
  	@HostListener('document:click', ['$event', '$event.target'])
  	onClick(event: MouseEvent, targetElement: HTMLElement) {
    	if (!targetElement) {
     		return;
    	}

    	const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    	if (!clickedInside) {
      		this.isOpen = false;
    	}
  	}
  	
    
  	constructor(private elementRef: ElementRef,
				private authService: AuthService,
				private router: Router,
				private loadingService: LoadingService,
				private alertsService: AlertsService) { }


  	ngOnInit() {
		$('#reportModal').appendTo('body');
	}

  	logOut() {
  		this.authService.logout();
  		this.router.navigateByUrl('/login');
	}

	goToProfile() {
  		this.router.navigateByUrl('/auth/profile');
	}

	sendReport() {
  		let content = $('#report').val();
		this.loadingService.show();
		this.authService.reportByMail({content: content}).subscribe((result: any) => {
			if (result.success) {
				this.alertsService.infoAlert = {
					active: true,
					text: 'You have successfully sent the report via email.'
				};
			} else {
				this.alertsService.dangerAlert = {
					active: true,
					text: 'Error. Failed to send report.'
				};
			}
			this.loadingService.hide();
		});
	}

	clearModal() {
		$('#report').val('');
	}

}
