<?php

namespace App\Http\Controllers\MedicineInventory;

use App\Http\Controllers\Controller;
use App\Http\Requests\DrugPurchaseRequest;
use App\Models\DrugPurchase;
use App\Models\DrugStock;
use App\Repositories\DrugPurchaseRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DrugPurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct(public DrugPurchaseRepositoryInterface $drugPurchaseRepositoryInterface)
    {
        $this->drugPurchaseRepositoryInterface = $drugPurchaseRepositoryInterface;
    }
    public function index()
    {
        $purchases = $this->drugPurchaseRepositoryInterface->index();

        return Inertia::render('MedicineInventory/Purchases/Index', compact('purchases'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $datas = $this->drugPurchaseRepositoryInterface->create();

        return Inertia::render('MedicineInventory/Purchases/Create', compact('datas'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DrugPurchaseRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->validated();

        
                for ($i = 0; $i < $data['quantity']; $i++) {
                    DrugStock::create([
                        'drug_id' => $data['drug_id'],
                        'quantity' => 1
                    ]);
                }
         
            
            $this->drugPurchaseRepositoryInterface->store($data);
            DB::commit();
            return to_route('drugs-purchases.index');
        } catch (\Throwable $th) {
            Log::error('cannot create store' . $th->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(DrugPurchase $drugPurchase)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DrugPurchase $drugPurchase)
    {
    
        return Inertia::render('MedicineInventory/Purchases/Edit', compact('drugPurchase'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DrugPurchase $drugPurchase)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DrugPurchase $drugPurchase)
    {
        //
    }
}
