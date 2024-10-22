// src/utils/timeStore.ts

type Listener = () => void;

class TimeStore {
  private currentTime: Date;
  private listeners: Set<Listener>;
  private timerID: number | null;

  constructor() {
    this.currentTime = new Date();
    this.listeners = new Set();
    this.timerID = null;
    this.startTimer();
  }

  private startTimer() {
    this.timerID = window.setInterval(() => {
      this.currentTime = new Date();
      this.notify();
    }, 1000);
  }

  private notify() {
    for(const listener of this.listeners) {
        listener();
    }
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    // Return an unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  getSnapshot(): Date {
    return this.currentTime;
  }

  // Optional: For SSR, you can set an initial time or handle differently
  getServerSnapshot(): Date {
    return this.currentTime;
  }

  // Cleanup method to stop the timer if needed
  stopTimer() {
    if (this.timerID !== null) {
      clearInterval(this.timerID);
      this.timerID = null;
    }
  }
}

// Create a singleton instance of TimeStore
const timeStore = new TimeStore();

export default timeStore;
