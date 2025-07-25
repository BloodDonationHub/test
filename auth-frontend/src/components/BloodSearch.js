import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './BloodSearch.css';
// Fix leaflet marker icons
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom blood bank icon
const bloodBankIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3261/3261622.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

const BloodSearch = () => {
    const [bloodType, setBloodType] = useState('O-');
    const [distance, setDistance] = useState(50);
    const [userLocation, setUserLocation] = useState(null);
    const [bloodBanks, setBloodBanks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [mapReady, setMapReady] = useState(false);

    // Get user location
    useEffect(() => {
        const getLocation = async () => {
            try {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            setUserLocation({
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            });
                            setMapReady(true);
                        },
                        (error) => {
                            console.warn('Using default location due to:', error);
                            setUserLocation({ lat: 40.7128, lng: -74.0060 }); // NYC default
                            setMapReady(true);
                        }
                    );
                } else {
                    setUserLocation({ lat: 40.7128, lng: -74.0060 });
                    setMapReady(true);
                }
            } catch (err) {
                console.error('Location error:', err);
                setUserLocation({ lat: 40.7128, lng: -74.0060 });
                setMapReady(true);
            }
        };
        getLocation();
    }, []);

    const searchBloodBanks = async () => {
        if (!userLocation) {
            setError('Location not available');
            return;
        }

        setLoading(true);
        setError('');
        setBloodBanks([]);

        try {
            const response = await axios.get('http://localhost:5000/api/blood-banks/search', {
                params: {
                    latitude: userLocation.lat,
                    longitude: userLocation.lng,
                    bloodType,
                    maxDistance: distance
                },
                timeout: 5000 // Add timeout
            });

            if (!response.data || response.data.length === 0) {
                setError('No blood banks found with the selected criteria');
                return;
            }

            // Transform data to ensure consistent structure
            const formattedBanks = response.data.map(bank => ({
                ...bank,
                location: {
                    ...bank.location,
                    coordinates: Array.isArray(bank.location.coordinates)
                        ? bank.location.coordinates
                        : [bank.location.coordinates[0], bank.location.coordinates[1]]
                },
                unitsAvailable: bank.unitsAvailable || bank.bloodInventory[bloodType] || 0
            }));

            setBloodBanks(formattedBanks);
        } catch (err) {
            console.error('Search error:', err);
            setError(err.response?.data?.error || err.message || 'Failed to search');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="blood-donation-app">
            <header className="app-header">
                <h1>Find Blood Banks</h1>
            </header>

            <div className="search-controls">
                <div className="form-group">
                    <label>Blood Type:</label>
                    <select
                        value={bloodType}
                        onChange={(e) => setBloodType(e.target.value)}
                    >
                        {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Max Distance (km):</label>
                    <input
                        type="number"
                        value={distance}
                        onChange={(e) => setDistance(Math.max(1, e.target.value))}
                        min="1"
                    />
                </div>

                <button
                    onClick={searchBloodBanks}
                    disabled={loading}
                    className="search-button"
                >
                    {loading ? 'Searching...' : 'Search Blood Banks'}
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="results-container">
                {/* Map Section - Left Side */}
                <div className="map-section">
                    {mapReady && (
                        <MapContainer
                            key={`map-${bloodBanks.length}`}
                            center={[userLocation.lat, userLocation.lng]}
                            zoom={13}
                            className="map"
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />

                            <Marker position={[userLocation.lat, userLocation.lng]}>
                                <Popup>Your Location</Popup>
                            </Marker>

                            {bloodBanks.map((bank, index) => (
                                <Marker
                                    key={`${bank._id || index}`}
                                    position={[bank.location.coordinates[1], bank.location.coordinates[0]]}
                                    icon={bloodBankIcon}
                                >
                                    <Popup>
                                        <div className="popup-content">
                                            <h3>{bank.name}</h3>
                                            <p>{bank.address}</p>
                                            <p><strong>Contact:</strong> {bank.contact}</p>
                                            <p><strong>Available {bloodType}:</strong> {bank.unitsAvailable} units</p>
                                            <p><strong>Distance:</strong> {bank.distance} km</p>
                                            <div className="popup-actions">
                                                <a href={`tel:${bank.contact}`} className="action-button call">Call</a>
                                                <a
                                                    href={`https://www.google.com/maps/dir/?api=1&destination=${bank.location.coordinates[1]},${bank.location.coordinates[0]}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="action-button directions"
                                                >
                                                    Directions
                                                </a>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    )}
                </div>

                {/* Results Section - Right Side */}
                <div className="results-section">
                    <h2>Available Blood Banks</h2>

                    {loading ? (
                        <div className="loading-message">Searching for blood banks...</div>
                    ) : bloodBanks.length === 0 ? (
                        <div className="empty-message">
                            {error ? error : 'No blood banks found. Try adjusting your search criteria.'}
                        </div>
                    ) : (
                        <div className="blood-bank-list">
                            {bloodBanks.map((bank) => (
                                <div key={bank._id} className="blood-bank-card">
                                    <h3>{bank.name}</h3>
                                    <p className="address">{bank.address}</p>

                                    <div className="bank-details">
                                        <p><span>Contact:</span> {bank.contact}</p>
                                        <p><span>Available {bloodType}:</span> {bank.unitsAvailable} units</p>
                                        <p><span>Distance:</span> {bank.distance} km</p>
                                    </div>

                                    <div className="action-buttons">
                                        <a href={`tel:${bank.contact}`} className="action-button call">
                                            Call Now
                                        </a>
                                        <a
                                            href={`https://www.google.com/maps/dir/?api=1&destination=${bank.location.coordinates[1]},${bank.location.coordinates[0]}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="action-button directions"
                                        >
                                            Get Directions
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BloodSearch;