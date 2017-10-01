import {EmpresarioFormComponent} from './app/components/empresario-form/empresario-form.component';
import {ActividadesItemComponent} from './app/components/actividades-item/actividades-item.component';
import {ActividadesFormComponent} from './app/components/actividades-form/actividades-form.component';
import {ActividadesListComponent} from './app/components/actividades-list/actividades-list.component';
import {ChallengeAddComponent} from './app/components/challenge-add/challenge-add.component';
import {OrganigramaComponent} from './app/components/organigrama/organigrama.component';
import {RetosListComponent} from './app/components/retos-list/retos-list.component';
import {MdSliderPipsComponent} from './app/components/md-slider-pips/md-slider-pips.component';
import {EmpatiaChartComponent} from './app/components/empatia-chart/empatia-chart.component';
import {PerfilinnovadorChartComponent} from './app/components/perfilinnovador-chart/perfilinnovador-chart.component';
import {MindexChartComponent} from './app/components/mindex-chart/mindex-chart.component';
import {EmpatiaFormComponent} from './app/components/empatia-form/empatia-form.component';
import {PerfilinnovadorFormComponent} from './app/components/perfilinnovador-form/perfilinnovador-form.component';
import {MindexFormComponent} from './app/components/mindex-form/mindex-form.component';
import {KickstarterDashboardComponent} from './app/components/kickstarter_dashboard/kickstarter_dashboard.component';
import {ProductBudgetComponent} from './app/components/product-budget/product-budget.component';
import {ProjectProdutcsComponent} from './app/components/project-produtcs/project-produtcs.component';
import {BudgetItemComponent} from './app/components/budget-item/budget-item.component';
import {BudgetListComponent} from './app/components/budget-list/budget-list.component';
import {BudgetFormComponent} from './app/components/budget-form/budget-form.component';
import {ProductFormComponent} from './app/components/product-form/product-form.component';
import {ResultFormComponent} from './app/components/result-form/result-form.component';
import {ProductItemComponent} from './app/components/product-item/product-item.component';
import {ProductListComponent} from './app/components/product-list/product-list.component';
import {ResultListComponent} from './app/components/result-list/result-list.component';
import {ResultItemComponent} from './app/components/result-item/result-item.component';
import {ProjectDashboardComponent} from './app/components/project-dashboard/project-dashboard.component';
import {ProjectItemComponent} from './app/components/project-item/project-item.component';
import {ProjectListComponent} from './app/components/project-list/project-list.component';
import {ProjectDetailComponent} from './app/components/project-detail/project-detail.component';
import {UserProjectsComponent} from './app/components/user-projects/user-projects.component';
import {ProjectFormComponent} from './app/components/project-form/project-form.component';
import { TablesSimpleComponent } from './app/components/tables-simple/tables-simple.component'
import { UiModalComponent } from './app/components/ui-modal/ui-modal.component'
import { UiTimelineComponent } from './app/components/ui-timeline/ui-timeline.component'
import { UiButtonsComponent } from './app/components/ui-buttons/ui-buttons.component'
import { UiIconsComponent } from './app/components/ui-icons/ui-icons.component'
import { UiGeneralComponent } from './app/components/ui-general/ui-general.component'
import { FormsGeneralComponent } from './app/components/forms-general/forms-general.component'
import { ChartsChartjsComponent } from './app/components/charts-chartjs/charts-chartjs.component'
import { WidgetsComponent } from './app/components/widgets/widgets.component'
import { UserProfileComponent } from './app/components/user-profile/user-profile.component'
import { UserVerificationComponent } from './app/components/user-verification/user-verification.component'
import { ComingSoonComponent } from './app/components/coming-soon/coming-soon.component'
import { UserEditComponent } from './app/components/user-edit/user-edit.component'
import { UserPermissionsEditComponent } from './app/components/user-permissions-edit/user-permissions-edit.component'
import { UserPermissionsAddComponent } from './app/components/user-permissions-add/user-permissions-add.component'
import { UserPermissionsComponent } from './app/components/user-permissions/user-permissions.component'
import { UserRolesEditComponent } from './app/components/user-roles-edit/user-roles-edit.component'
import { UserRolesAddComponent } from './app/components/user-roles-add/user-roles-add.component'
import { UserRolesComponent } from './app/components/user-roles/user-roles.component'
import { UserListsComponent } from './app/components/user-lists/user-lists.component'
import { DashboardComponent } from './app/components/dashboard/dashboard.component'
import { NavSidebarComponent } from './app/components/nav-sidebar/nav-sidebar.component'
import { NavHeaderComponent } from './app/components/nav-header/nav-header.component'
import { LoginLoaderComponent } from './app/components/login-loader/login-loader.component'
import { ResetPasswordComponent } from './app/components/reset-password/reset-password.component'
import { ForgotPasswordComponent } from './app/components/forgot-password/forgot-password.component'
import { LoginFormComponent } from './app/components/login-form/login-form.component'
import { RegisterFormComponent } from './app/components/register-form/register-form.component'

angular.module('app.components')
	.component('empresarioForm', EmpresarioFormComponent)
	.component('actividadesItem', ActividadesItemComponent)
	.component('actividadesForm', ActividadesFormComponent)
	.component('actividadesList', ActividadesListComponent)
	.component('challengeAdd', ChallengeAddComponent)
	.component('organigrama', OrganigramaComponent)
	.component('retosList', RetosListComponent)
	.component('mdSliderPips', MdSliderPipsComponent)
	.component('empatiaChart', EmpatiaChartComponent)
	.component('perfilinnovadorChart', PerfilinnovadorChartComponent)
	.component('mindexChart', MindexChartComponent)
	.component('empatiaForm', EmpatiaFormComponent)
	.component('perfilinnovadorForm', PerfilinnovadorFormComponent)
	.component('mindexForm', MindexFormComponent)
	.component('kickstarterDashboard', KickstarterDashboardComponent)
	.component('productBudget', ProductBudgetComponent)
	.component('projectProdutcs', ProjectProdutcsComponent)
	.component('budgetItem', BudgetItemComponent)
	.component('budgetList', BudgetListComponent)
	.component('budgetForm', BudgetFormComponent)
	.component('productForm', ProductFormComponent)
	.component('resultForm', ResultFormComponent)
	.component('productItem', ProductItemComponent)
	.component('productList', ProductListComponent)
	.component('resultList', ResultListComponent)
	.component('resultItem', ResultItemComponent)
	.component('projectDashboard', ProjectDashboardComponent)
	.component('projectItem', ProjectItemComponent)
	.component('projectList', ProjectListComponent)
	.component('projectDetail', ProjectDetailComponent)
	.component('userProjects', UserProjectsComponent)
	.component('projectForm', ProjectFormComponent)
  .component('tablesSimple', TablesSimpleComponent)
  .component('uiModal', UiModalComponent)
  .component('uiTimeline', UiTimelineComponent)
  .component('uiButtons', UiButtonsComponent)
  .component('uiIcons', UiIconsComponent)
  .component('uiGeneral', UiGeneralComponent)
  .component('formsGeneral', FormsGeneralComponent)
  .component('chartsChartjs', ChartsChartjsComponent)
  .component('widgets', WidgetsComponent)
  .component('userProfile', UserProfileComponent)
  .component('userVerification', UserVerificationComponent)
  .component('comingSoon', ComingSoonComponent)
  .component('userEdit', UserEditComponent)
  .component('userPermissionsEdit', UserPermissionsEditComponent)
  .component('userPermissionsAdd', UserPermissionsAddComponent)
  .component('userPermissions', UserPermissionsComponent)
  .component('userRolesEdit', UserRolesEditComponent)
  .component('userRolesAdd', UserRolesAddComponent)
  .component('userRoles', UserRolesComponent)
  .component('userLists', UserListsComponent)
  .component('dashboard', DashboardComponent)
  .component('navSidebar', NavSidebarComponent)
  .component('navHeader', NavHeaderComponent)
  .component('loginLoader', LoginLoaderComponent)
  .component('resetPassword', ResetPasswordComponent)
  .component('forgotPassword', ForgotPasswordComponent)
  .component('loginForm', LoginFormComponent)
  .component('registerForm', RegisterFormComponent)
