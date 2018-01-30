<!doctype html>

<html>
<head>
	  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	  <link href="css/table.css" rel="stylesheet">
 </head>
	<body  class="">
 
		<table >
		 
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
				<td style="text-align: center" valign="middle"   colspan="10" align="center"><h3>Reporte Financiero</h3></td>
			</tr>
 
		</table>


@foreach ($project->results as $indexResult => $result)
<table class="bordered table-report">
	
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
			@if(count($product->wallets)>0)

				<tr>
					<td     class="filled-blue" valign="middle" align="center">
					<b>	P{{ $indexProduct + 1 }} {{$product->rowspan}} </b>
					</td>
					<td colspan="5">
						Producto {{$indexProduct + 1}}: <span>  {{ $product->desc }}</span>
					</td>
					<td  class="filled-blue" valign="middle"><b>Inicio: </b></td>
					<td ><b>{{ $product->fecha_inicio }}</b></td>
					<td  class="filled-blue" valign="middle"><b>Fin: </b></td>
					<td ><b>{{ $product->fecha_fin }}</b></td>
				</tr>
				
				@foreach ($product->budgets as $indexBudgets => $budget)
					@if($budget->total_executed>0)
						<tr>
							<td ></td>
							<td   class="filled-blue-light" valign="middle" align="center">
								<b>RU {{ ++$indexBudgets }} {{$budget->rowspan}}</b>
							</td>
							<td colspan="8">
								Rubro {{ $indexBudgets }}: <span>  {{ $budget->titulo }}</span>
							</td>
						 
						</tr>
						
						@foreach ($budget->budgetproducts as $indexBudgetproduct => $budgetproduct)
							@if( count($budgetproduct->wallets)>0) 
								<tr>
									<td></td>
									<td></td>

									<td  class="filled-blue-light" valign="middle" align="center">
										<b>Descripción {{ ++$indexBudgetproduct }}</b>
									</td>
									<td colspan="7">
										 <span>  {{ $budgetproduct->descripcion }}</span>
									</td>
								 
								</tr>
								

						
						 
								<tr>
									<td  ></td>
									<td  ></td>
									<td  class="filled-blue-light2" colspan="3"><b>Detalle</b></td>
									<td  class="filled-blue-light2"><b>tipo</td>
									<td  class="filled-blue-light2"><b>Documento Soporte</b></td>
									<td  class="filled-blue-light2"><b>Sena</b></td>
									<td  class="filled-blue-light2"><b>C. Especie</b></td>
									<td  class="filled-blue-light2"><b>C. Efectivo</b></td>
									 
								</tr>
								
							
								@foreach ( $budgetproduct->wallets as $wallet )
									<tr>
										<td></td>
										<td></td>
										<td  colspan="3">{{$wallet->desc}}</td>
										<td >{{$wallet->type}}</td>
										<td >{{$wallet->doc}}</td>
										<td  align="right" valign="center"><b>
											@if($wallet->type == "sena")
												{{   $wallet->cantidad  	}} 
											@endif
											</b>
										</td>
										<td align="right" valign="center">
											<b>
											@if($wallet->type == "cp")
												 {{   $wallet->cantidad }} 
											@endif
											</b>
										</td>
										<td align="right" valign="center">
											<b>
											@if($wallet->type == "ce")
												{{   $wallet->cantidad }} 
											@endif
											</b>
										</td>
									</tr>
									
								@endforeach


								<tr>
									<td></td>
									<td></td>
									<td class="filled-blue-light2" colspan="5" align="right"><b><i>Total Ejecutado</i></b></td>
									<td align="right" valign="center">
										<b>
										{{ (isset($budgetproduct->wallets_executed["sena"])) ? $budgetproduct->wallets_executed["sena"]->total_executed :"0" }}
										</b>
									</td>
									<td align="right" valign="center">
										<b>
										{{ (isset($budgetproduct->wallets_executed["cp"])) ? $budgetproduct->wallets_executed["cp"]->total_executed :"0" }}
										</b>
									</td>
									<td align="right" valign="center">
										<b>
										{{ (isset($budgetproduct->wallets_executed["ce"])) ? $budgetproduct->wallets_executed["ce"]->total_executed :"0" }}
										</b>
									</td>
									
								</tr>
								
								<tr>
									<td ></td>
									<td></td>
									<td class="filled-blue-light2" colspan="5" align="right"><b><i>Disponible</i></b></td>
									<td align="right" valign="center"><b>{{(isset($budgetproduct->wallets_executed["sena"])) ?  $budgetproduct->financiacion_sena - $budgetproduct->wallets_executed["sena"]->total_executed  :$budgetproduct->financiacion_sena  }}</b></td>
									<td align="right" valign="center"><b>{{(isset($budgetproduct->wallets_executed["cp"])) ?  $budgetproduct->c_especie - $budgetproduct->wallets_executed["cp"]->total_executed  :$budgetproduct->c_especie  }}</b></td>
									<td align="right" valign="center"><b>{{(isset($budgetproduct->wallets_executed["ce"])) ?  $budgetproduct->c_efectivo - $budgetproduct->wallets_executed["ce"]->total_executed  :$budgetproduct->c_efectivo  }}</b></td>
									
								</tr>
									
					 

							@endif
						@endforeach

					 
					@endif
				@endforeach

			
			@endif
		@endforeach

 
</table>

@endforeach	
</body>
</html>