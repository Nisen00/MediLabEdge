<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bookings = Booking::all();
        return response()->json(['bookings' => $bookings], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'booking_date' => 'required|date',
            'doctor_name' => 'required|string',
            'price' => 'required|numeric',
            'phone' => 'required|string',
            'isConfirmed' => 'required|boolean',
        ]);

        $booking = Booking::create($validatedData);

        return response()->json(['booking' => $booking], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        return response()->json(['booking' => $booking], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Booking $booking)
    {
        $validatedData = $request->validate([
            'name' => 'string',
            'booking_date' => 'date',
            'doctor_name' => 'string',
            'price' => 'numeric',
            'phone' => 'string',
            'isConfirmed' => 'boolean',
        ]);

        $booking->update($validatedData);

        return response()->json(['booking' => $booking], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        $booking->delete();
        return response()->json(null, 204);
    }
}
