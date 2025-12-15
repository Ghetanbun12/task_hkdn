import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface DeviceData {
  key: number;
  code: string;
  name: string;
  ipAddress: string;
  username: string;
  password: string;
  deviceType: string;
  serviceUsed: string;
  status: 'active' | 'inactive';
  description?: string;
  connectionStatus: 'active' | 'inactive'; 
}

interface DeviceState {
  Devices: DeviceData[];
  loading: boolean;
  error: string | null;
}

const initialState: DeviceState = {
  Devices: [],
  loading: false,
  error: null,
};

// API gọi danh sách dịch vụ
export const fetchDevices = createAsyncThunk(
  "Devices/fetch",
  async () => {
    const res = await axios.get("http://localhost:3001/devices");
    return res.data;
  }
);

const DeviceSlice = createSlice({
  name: "Devices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.loading = false;
        state.Devices = action.payload;
      })
      .addCase(fetchDevices.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load Device data";
      });
  },
});

export default DeviceSlice.reducer;
