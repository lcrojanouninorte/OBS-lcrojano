<!doctype html>

<html>
<head>
	  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	  <link href="css/table.css" rel="stylesheet">
 </head>
	<body  class="">
 
		<table  border="1">
			<tr></tr>
			<tr>
				<td></td>
				<td></td>
				<td ><img src="img/logo_uninorte.jpg" alt="Uninorte" height="auto" width="100"></td>
				<td></td>
				<td></td>
				<td ><img src="img/logo_sena.png" alt="Uninorte" height="auto" width="70"></td>
				<td></td>
				<td></td>
				<td></td>
				<td ><img src="img/logo_sennova.jpg" alt="Uninorte" height="auto" width="100"></td>

			</tr>
		 
			<tr></tr>
			<tr></tr>
			<tr></tr>
			<tr>
				<td style="text-align: center" valign="middle"   colspan="10" align="center"><h3>Reporte Finaciero</h3></td>
			</tr>
		<tr></tr>
		</table>


@foreach ($project->results as $indexResult => $result)
<table class="table-report bordered">
	 
		<tr>
			<th class="filled-blue" valign="middle" align="center">
				R{{ $indexResult+1 }}
			</th>
			<th style="wrap-text: true;" colspan="5" height="40" valign="middle" align="center"> 
				Resultado: {{ $result->titulo }}
			</th>
 
				
			<th  class="filled-blue" valign="middle">Inicio: </th>
			<th >{{ $result->fecha_inicio }}</th>
			<th  class="filled-blue" valign="middle">Fin: </th>
			<th >{{ $result->fecha_fin }}</th>
		</tr>
 
		@foreach ($result->products as $indexProduct => $product)
			<tr>
				<td rowspan="{{count($product->budgets)+1}}" class="filled-blue" valign="middle" align="center">
					P{{ $indexProduct + 1 }}
				</td>
				<td colspan="5">
					Producto {{$indexProduct + 1}}: <span>  {{ $product->desc }}</span>
				</td>
				<td  class="filled-blue-light" valign="middle">Inicio: </td>
				<td >{{ $product->fecha_inicio }}</td>
				<td  class="filled-blue-light" valign="middle">Fin: </td>
				<td >{{ $product->fecha_fin }}</td>
			</tr>
 
		 
			@foreach ($product->budgets as $indexBudgets => $budget)
				<tr>
					<td></td>
					<td rowspan="{{count( $budget->budgetproducts)+1}}" class="filled-blue-light" valign="middle" align="center">
						RU {{ ++$indexBudgets }}
					</td>
					<td colspan="8">
						Rubro {{ $indexBudgets }}: <span>  {{ $budget->titulo }}</span>
					</td>
				 
				</tr>
				@foreach ($budget->budgetproducts as $indexBudgetproduct => $budgetproduct)
					<tr>
						<td></td>
						<td></td>

						<td  class="filled-blue-light" valign="middle" align="center">
							Descripción {{ ++$indexBudgetproduct }}
						</td>
						<td colspan="7">
							 <span>  {{ $budgetproduct->descripcion }}</span>
						</td>
					 
					</tr>

					@if( count($budgetproduct->wallets)>0) 
				 
						<tr>
							<td></td>
							<td></td>
							<td colspan="3">Descripción</td>
							<td >tipo</td>
							<td >Documento Soporte</td>
							<td >Sena</td>
							<td >C. Especie</td>
							<td >C. Efectivo</td>
							 
						</tr>
					
						@foreach ( $budgetproduct->wallets as $wallet )
							<tr>
								<td></td>
								<td></td>
								<td  colspan="3">{{$wallet->desc}}</td>
								<td >{{$wallet->type}}</td>
								<td >{{$wallet->doc}}</td>
								<td>
									@if($wallet->type == "sena")
										{{$wallet->cantidad}} 
									@endif
								</td>
								<td>
									@if($wallet->type == "cp")
										 {{$wallet->cantidad}} 
									@endif
								</td>
								<td>
									@if($wallet->type == "ce")
										{{$wallet->cantidad}} 
									@endif
								</td>
							</tr>
						@endforeach	
			 

					@endif
				@endforeach

			 

			@endforeach

		 
		@endforeach	
 
</table>


@endforeach	
</body>
</html>