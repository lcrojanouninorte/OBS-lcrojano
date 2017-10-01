<?php

use Illuminate\Database\Seeder;
use App\Budget;
class BudgetsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('budgets')->delete();
 
Budget::create(['id'=>1, 'titulo'	=> 'Acceso a Informacion especializada', 'tipo_financiamiento'=>	'sena', 'porcentaje_maximo'=>	100, 'porcentaje_minimo'=>	0, 'icon'=>1]);
Budget::create(['id'=>2, 'titulo'	=> 'Adquisición Equipos y Software', 'tipo_financiamiento'=>	'empresa', 'porcentaje_maximo'=>	100, 'porcentaje_minimo'=>	0, 'icon'=>1]);
Budget::create(['id'=>3, 'titulo'	=> 'Aportes parafiscales y SGSS del personal del proye', 'tipo_financiamiento'=>	'empresa', 'porcentaje_maximo'=>	100, 'porcentaje_minimo'=>	0, 'icon'=>1]);
Budget::create(['id'=>4, 'titulo'	=> 'Arrendamiento de Equipo (no disp. por ejecutores)', 'tipo_financiamiento'=>	'sena', 'porcentaje_maximo'=>	100, 'porcentaje_minimo'=>	0, 'icon'=>1]);
Budget::create(['id'=>5, 'titulo'	=> 'Costo Personal Técnico Especializado', 'tipo_financiamiento'=>	'sena', 'porcentaje_maximo'=>	100, 'porcentaje_minimo'=>	0, 'icon'=>1]);
Budget::create(['id'=>6, 'titulo'	=> 'Costo Personal no Calificado', 'tipo_financiamiento'=>	'sena', 'porcentaje_maximo'=>	100, 'porcentaje_minimo'=>	0, 'icon'=>1]);
Budget::create(['id'=>7, 'titulo'	=> 'Diseño de Prototipos', 'tipo_financiamiento'=>	'sena', 'porcentaje_maximo'=>	100, 'porcentaje_minimo'=>	0, 'icon'=>1]);
Budget::create(['id'=>8, 'titulo'	=> 'Gastos Normaliz, Certific y Registro', 'tipo_financiamiento'=>	'sena', 'porcentaje_maximo'=>	100, 'porcentaje_minimo'=>	0, 'icon'=>1]);
Budget::create(['id'=>9, 'titulo'	=> 'Gastos de Patentamiento', 'tipo_financiamiento'=>	'sena', 'porcentaje_maximo'=>	100, 'porcentaje_minimo'=>	0, 'icon'=>1]);
Budget::create(['id'=>10, 'titulo'	=> 'Gastos de administracion del Proyecto', 'tipo_financiamiento'=>	'sena', 'porcentaje_maximo'=>	5, 'porcentaje_minimo'=>	0, 'icon'=>1]);
Budget::create(['id'=>11, 'titulo'	=> 'Insumos y Materiales', 'tipo_financiamiento'=>	'sena', 'porcentaje_maximo'=>	100, 'porcentaje_minimo'=>	0, 'icon'=>1]);
Budget::create(['id'=>12, 'titulo'	=> 'Inversiones en Planta, Adecuaciones, Uso Equipos', 'tipo_financiamiento'=>	'	empresa', 'porcentaje_maximo'=>	100, 'porcentaje_minimo'=>	0, 'icon'=>1]);
Budget::create(['id'=>13, 'titulo'	=> 'Pago Servicios Tecnológicos', 'tipo_financiamiento'=>	'sena', 'porcentaje_maximo'=>	100, 'porcentaje_minimo'=>	0, 'icon'=>1]);
Budget::create(['id'=>14, 'titulo'	=> 'Polizas del convenio a suscribir', 'tipo_financiamiento'=>	'	empresa', 'porcentaje_maximo'=>	100, 'porcentaje_minimo'=>	0, 'icon'=>1]);
Budget::create(['id'=>15, 'titulo'	=> 'Publicaciones de Resultados', 'tipo_financiamiento'=>	'empresa', 'porcentaje_maximo'=>	100, 'porcentaje_minimo'=>	0, 'icon'=>1]);
Budget::create(['id'=>16, 'titulo'	=> 'Transferencia Tecnologica al SENA', 'tipo_financiamiento'=>	'sena', 'porcentaje_maximo'=>	100, 'porcentaje_minimo'=>	3]);
Budget::create(['id'=>17, 'titulo'	=> 'Viaticos y Pasajes Personal de las entidades ejecu', 'tipo_financiamiento'=>	'empresa', 'porcentaje_maximo'=>	100, 'porcentaje_minimo'=>	0, 'icon'=>1]);


    }
}
