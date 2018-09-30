<?php

namespace App\Http\Controllers\Catalog;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use  App\Model\Category;
use  App\Model\Product;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    protected $product;
    protected $id;
    protected $productCollection;

    public function __construct(Request $request)
    {
        $id = $request->route()->parameter('id');
        $this->id = $id;
        $this->product = Product::find(2);
    }

    public function view()
    {
        return view('catalog/product/product_view' , ['data' => $this ->getData()]);
    }

    /*
     * ADD TO CART
     */
    public function addtocart(Request $request) {
        $cart_items = array();
        $grand_total = 0;
        $id = $request ->product_id;
        $productModel = new Product();
        $data  = $productModel ->load($id)->first();
      // $request->session()->forget('cart');
        if(!$request->session()->has('cart')){
           //session('cart', array('items'=>array()));
        }
        else{
             $cart =  session('cart');
             $cart_items = $cart['items']; //_log(session('carts'));
        }             

        $cart_items[ $data ->id ] = $data;

        foreach ($cart_items as $item) {
            $grand_total += ($item->base_price + 30);
        } 

        session(['cart' => [
            'items'=> $cart_items,
            'grand_total'=> $grand_total
        ]]);
        
        $response = array(
            'status' => 'success'           
        );
        return response()->json($response);
    }

    /**
     * @return mixed|static
     */
    public function getData($id = null)
    {
        $productModel = new Product();
        $data  = $productModel ->load($this->id)->first();
        session('current_product', $data);
        return $data;
    }
}
