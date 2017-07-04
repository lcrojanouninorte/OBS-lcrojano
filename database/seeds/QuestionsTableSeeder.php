<?php

use Illuminate\Database\Seeder;
use App\Question;

class QuestionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
         DB::table('questions')->delete();
Question::create(['id'=>1, 'survey_id' =>	1, 'categoria' => 0, 'desc' =>"Los trabajadores tienen una idea clara de como la innovación nos ayuda a competir"]);
Question::create(['id'=>2, 'survey_id' =>	1, 'categoria' => 1, 'desc' =>"Tenemos procesos claros que nos ayudan a gestionar el desarrollo de nuevos productos desde la idea hasta el lanzamiento"]);
Question::create(['id'=>3, 'survey_id' =>	1, 'categoria' => 2, 'desc' =>"Nuestra estructura organizacional no reprime la innovación, sino que ayuda a que suceda"]);
Question::create(['id'=>4, 'survey_id' =>	1, 'categoria' => 4, 'desc' =>"Hay un gran compromiso para el entrenamiento y desarrollo de los trabajadores"]);
Question::create(['id'=>5, 'survey_id' =>	1, 'categoria' => 3, 'desc' =>"Tenemos una relación ganar-ganar con nuestros proveedores"]);
Question::create(['id'=>6, 'survey_id' =>	1, 'categoria' => 0, 'desc' =>"Nuestra estrategia de innovación es comunicada de manera clara, de tal modo que cada trabajador entiende sus objetivos de innovación"]);
Question::create(['id'=>7, 'survey_id' =>	1, 'categoria' => 1, 'desc' =>"Nuestros proyectos de innovación usualmente se completan a tiempo y dentro del presupuesto"]);
Question::create(['id'=>8, 'survey_id' =>	1, 'categoria' => 2, 'desc' =>"Los trabajadores trabajan bien en equipo sin importar áreas o departamentos"]);
Question::create(['id'=>9, 'survey_id' =>	1, 'categoria' => 4, 'desc' =>"Nos tomamos el tiempo para revisar nuestros proyectos y mejorar nuestro desempeño en futuras ocasiones"]);
Question::create(['id'=>10, 'survey_id' =>	1, 'categoria' => 3, 'desc' =>"Tenemos un buen conocimiento de las necesidades de nuestros clientes o usuarios"]);
Question::create(['id'=>11, 'survey_id' =>	1, 'categoria' => 0, 'desc' =>"Los clientes conocen nuestra propuesta de valor"]);
Question::create(['id'=>12, 'survey_id' =>	1, 'categoria' => 1, 'desc' =>"Tenemos mecanismos efectivos para que todo el equipo de trabajo conozca las necesidades de los clientes"]);
Question::create(['id'=>13, 'survey_id' =>	1, 'categoria' => 2, 'desc' =>"Los trabajadores se involucran en el mejoramiento de los procesos y productos"]);
Question::create(['id'=>14, 'survey_id' =>	1, 'categoria' => 3, 'desc' =>"Trabajamos bien con otras instituciones de formación superior o centros de investigación"]);
Question::create(['id'=>15, 'survey_id' =>	1, 'categoria' => 4, 'desc' =>"Aprendemos de nuestros errores"]);
Question::create(['id'=>16, 'survey_id' =>	1, 'categoria' => 0, 'desc' =>"Utilizamos herramientas para predecir nuevas oportunidades y retos"]);
Question::create(['id'=>17, 'survey_id' =>	1, 'categoria' => 1, 'desc' =>"Tenemos mecanismos efectivos para gestionar cambios en los procesos productivos desde la generación de la idea hasta la implementación"]);
Question::create(['id'=>18, 'survey_id' =>	1, 'categoria' => 2, 'desc' =>"Nuestra estructura permite la toma de decisiones de manera rápida y efectiva"]);
Question::create(['id'=>19, 'survey_id' =>	1, 'categoria' => 3, 'desc' =>"Co-creamos con nuestros clientes para explorar y desarrollar nuevos conceptos"]);
Question::create(['id'=>20, 'survey_id' =>	1, 'categoria' => 4, 'desc' =>"Hacemos comparaciones sistemáticas de nuestros productos con otros competidores"]);
Question::create(['id'=>21, 'survey_id' =>	1, 'categoria' => 0, 'desc' =>"Nuestros trabajadores tienen una visión compartida de como la empresa crece con la innovación"]);
Question::create(['id'=>22, 'survey_id' =>	1, 'categoria' => 1, 'desc' =>"Buscamos ideas de manera sistemática"]);
Question::create(['id'=>23, 'survey_id' =>	1, 'categoria' => 2, 'desc' =>"La comunicación es efectiva en todos los niveles de la empresa"]);
Question::create(['id'=>24, 'survey_id' =>	1, 'categoria' => 3, 'desc' =>"Colaboramos con otras empresas para desarrollar nuevos productos o procesos"]);
Question::create(['id'=>25, 'survey_id' =>	1, 'categoria' => 4, 'desc' =>"compartimos experiencias con otras empresas que nos ayudan en el proceso de aprendizaje"]);
Question::create(['id'=>26, 'survey_id' =>	1, 'categoria' => 0, 'desc' =>"Hay un gran compromiso en la dirección para incentivar la innovación"]);
Question::create(['id'=>27, 'survey_id' =>	1, 'categoria' => 1, 'desc' =>"Contamos con mecanismos para garantizar la participación temprana de todos los departamentos en el desarrollo de nuevos productos y procesos"]);
Question::create(['id'=>28, 'survey_id' =>	1, 'categoria' => 2, 'desc' =>"Nuestro sistema de recompensa y reconocimiento apoya la innovación"]);
Question::create(['id'=>29, 'survey_id' =>	1, 'categoria' => 3, 'desc' =>"Tratamos de desarrollar las redes externas de personas pueden nos pueden ayudar a tener conocimientos especializados"]);
Question::create(['id'=>30, 'survey_id' =>	1, 'categoria' => 4, 'desc' =>"Somos buenos en la captura de lo que hemos aprendido y en la transferencia de este conocimiento a todos los trabajadores de la empresa"]);
Question::create(['id'=>31, 'survey_id' =>	1, 'categoria' => 0, 'desc' =>"Tenemos procesos en marcha para revisar los nuevos desarrollos tecnológicos o de mercado y para entender lo que éstos significan para la estrategia de nuestra empresa"]);
Question::create(['id'=>32, 'survey_id' =>	1, 'categoria' => 1, 'desc' =>"Tenemos un sistema para escoger proyectos de innovación"]);
Question::create(['id'=>33, 'survey_id' =>	1, 'categoria' => 2, 'desc' =>"Tenemos un clima de apoyo para las nuevas ideas - la gente no tiene que salir de la organización para hacer que sucedan"]);
Question::create(['id'=>34, 'survey_id' =>	1, 'categoria' => 3, 'desc' =>"Trabajamos en estrecha colaboración con el sistema educativo local y nacional para identificar nuestras necesidades de personal"]);
Question::create(['id'=>35, 'survey_id' =>	1, 'categoria' => 4, 'desc' =>"Somos buenos aprendiendo de otras organizaciones"]);
Question::create(['id'=>36, 'survey_id' =>	1, 'categoria' => 0, 'desc' =>"Existe un claro vínculo entre los proyectos de innovación que desarrollamos y la estrategia global de la empresa"]);
Question::create(['id'=>37, 'survey_id' =>	1, 'categoria' => 1, 'desc' =>"Hay suficiente flexibilidad en nuestro sistema de desarrollo de productos, el cual permite el desarrollo rápido de prototipos"]);
Question::create(['id'=>38, 'survey_id' =>	1, 'categoria' => 2, 'desc' =>"Trabajamos bien en equipos"]);
Question::create(['id'=>39, 'survey_id' =>	1, 'categoria' => 3, 'desc' =>"Trabajamos en estrecha colaboración con los principales usuarios para desarrollar nuevos productos y servicios"]);
Question::create(['id'=>40, 'survey_id' =>	1, 'categoria' => 4, 'desc' =>"Utilizamos la medición para ayudar a identificar dónde y cuándo podemos mejorar nuestra gestión de la innovación"]);



/*Perfil inovador*/

Question::create(['id'=> 41, 'categoria' => 0, 'survey_id' => 2, 'desc' =>   'Me gusta probar y revisar mis ideas antes de llegar a la solución o producto final']);
Question::create(['id'=> 42, 'categoria' => 1, 'survey_id' => 2, 'desc' =>   'Me gusta tomarme el tiempo para calificar la naturaleza exacta del problema']);
Question::create(['id'=> 43, 'categoria' => 2, 'survey_id' => 2, 'desc' =>   'Disfruto de tomar los pasos necesarios para poner mis ideas en acción']);
Question::create(['id'=> 44, 'categoria' => 3, 'survey_id' => 2, 'desc' =>   'Me gusta desarmar un problema con el fin de examinarlo desde todos los angulos']);
Question::create(['id'=> 45, 'categoria' => 0, 'survey_id' => 2, 'desc' =>   'Encuentro difícil que me surjan ideas inusuales para resolver problemas']);
Question::create(['id'=> 46, 'categoria' => 1, 'survey_id' => 2, 'desc' =>   'Me gusta identificar los hechos más relevantes relacionados a un problema']);
Question::create(['id'=> 47, 'categoria' => 2, 'survey_id' => 2, 'desc' =>   'No tengo temperamento para dar un paso atrás e identificar las causas específicas de un problema']);
Question::create(['id'=> 48, 'categoria' => 3, 'survey_id' => 2, 'desc' =>   'Disfruto de tener formas únicas de mirar los problemas']);
Question::create(['id'=> 49, 'categoria' => 0, 'survey_id' => 2, 'desc' =>   'Me gusta identificar todos los pros y contras de una potencial solución']);
Question::create(['id'=> 50, 'categoria' => 1, 'survey_id' => 2, 'desc' =>   'Antes de implementar una solución me gusta desarmarla en pasos']);
Question::create(['id'=> 51, 'categoria' => 2, 'survey_id' => 2, 'desc' =>   'Transformar ideas en acciones no es lo que más disfruto']);
Question::create(['id'=> 52, 'categoria' => 3, 'survey_id' => 2, 'desc' =>   'Me gusta generar criterios que pueden ser usados para identificar las mejores opciones']);
Question::create(['id'=> 53, 'categoria' => 0, 'survey_id' => 2, 'desc' =>   'Me atrae la novedad']);
Question::create(['id'=> 54, 'categoria' => 1, 'survey_id' => 2, 'desc' =>   'No suelo dedicar mucho tiempo a definir con exactitud el problema se ha de resolver']);
Question::create(['id'=> 55, 'categoria' => 2, 'survey_id' => 2, 'desc' =>   'Me gusta captar una situación mirando el panorama general']);
Question::create(['id'=> 56, 'categoria' => 3, 'survey_id' => 2, 'desc' =>   'Disfruto de trabajar en problemas novedosos o mal definidos']);
Question::create(['id'=> 57, 'categoria' => 0, 'survey_id' => 2, 'desc' =>   'Cuando trabajo en un problema me gusta que se me ocurra la mejor forma de enunciarlo']);
Question::create(['id'=> 58, 'categoria' => 1, 'survey_id' => 2, 'desc' =>   'Disfruto de hacer que las cosas pasen']);
Question::create(['id'=> 59, 'categoria' => 2, 'survey_id' => 2, 'desc' =>   'Me gusta enfocarme en crear una declaración precisa del problema']);
Question::create(['id'=> 60, 'categoria' => 3, 'survey_id' => 2, 'desc' =>   'Me gusta expandir mi imaginación para producir muchas ideas']);
Question::create(['id'=> 61, 'categoria' => 0, 'survey_id' => 2, 'desc' =>   'Me gusta enfocarme en la información clave con respecto a una solución']);
Question::create(['id'=> 62, 'categoria' => 1, 'survey_id' => 2, 'desc' =>   'Disfruto tomarme el tiempo para perfeccionar una idea']);
Question::create(['id'=> 63, 'categoria' => 2, 'survey_id' => 2, 'desc' =>   'Encuentro difícil realizar mis ideas']);
Question::create(['id'=> 64, 'categoria' => 3, 'survey_id' => 2, 'desc' =>   'Disfruto de convertir ideas sueltas en soluciones concretas']);
Question::create(['id'=> 65, 'categoria' => 0, 'survey_id' => 2, 'desc' =>   'Me gusta pensar en todas las cosas que necesito hacer para implementar una idea']);
Question::create(['id'=> 66, 'categoria' => 1, 'survey_id' => 2, 'desc' =>   'Realmente disfruto de implementar una idea']);
Question::create(['id'=> 67, 'categoria' => 2, 'survey_id' => 2, 'desc' =>   'Tiendo a hacer muchas preguntas para comprender con claridad cada situación']);
Question::create(['id'=> 68, 'categoria' => 3, 'survey_id' => 2, 'desc' =>   'Me gusta trabajar en ideas únicas']);
Question::create(['id'=> 69, 'categoria' => 0, 'survey_id' => 2, 'desc' =>   'Disfruto poner mis ideas en acción']);
Question::create(['id'=> 70, 'categoria' => 1, 'survey_id' => 2, 'desc' =>   'Me gusta explorar fortalezas y debilidades de una potencial solución']);
Question::create(['id'=> 71, 'categoria' => 2, 'survey_id' => 2, 'desc' =>   'Disfruto de buscar información para identificar la cusa raiz de un problema particular']);
Question::create(['id'=> 72, 'categoria' => 3, 'survey_id' => 2, 'desc' =>   'Disfruto el análisis y el esfuerzo que toma transformar conceptos aproximados en una idea viable']);
Question::create(['id'=> 73, 'categoria' => 0, 'survey_id' => 2, 'desc' =>   'Mi tendencia natural es no generar muchas ideas para los problemas']);
Question::create(['id'=> 74, 'categoria' => 1, 'survey_id' => 2, 'desc' =>   'Disfruto usar metáforas y analogías para que se me ocurran nuevas ideas para los problemas']);
Question::create(['id'=> 75, 'categoria' => 2, 'survey_id' => 2, 'desc' =>   'La gente me busca de forma natural para que los trabajos se realicen']);
Question::create(['id'=> 76, 'categoria' => 3, 'survey_id' => 2, 'desc' =>   'Me gusta esforzarme por encontrar soluciones cuidadosamente elaboradas']);


 /*Empatia*/
Question::create(['id'=>77,'categoria' => 1, 'survey_id' => 3, 'desc' => '¿A quién escogerías para que te ayude a descifrar los ingredientes de la receta de la Coca-cola?']);
Question::create(['id'=>78,'categoria' => 2, 'survey_id' => 3, 'desc' => '¿A quién escogerías para crear un comercial de tv publicitario de tu empresa?']);
Question::create(['id'=>79,'categoria' => 3, 'survey_id' => 3, 'desc' => 'Compraste una biblioteca modular, ¿Con quién preferirías armarla?']);
Question::create(['id'=>80,'categoria' => 4, 'survey_id' => 3, 'desc' => 'Estas en el Titanic, ¿A quién escogerías para evitar el hundimiento?']);

 }
}
