export type User = {
  _id: string;
  username: string;
  email: string;
  tel?: string;
  password?: string;
  created_at?: string;
  updatedAt?: string;
};

export type UserForAuth = {
  id: string,
  firstName: string,
  secondName: string,
  tel?: string,
  email: string,
  password: string
}


// a value that can be also null or undefined
export type Maybe<T> = T | null | undefined;


  export type LoginRequest = {
    email: string;
    password: string;
  }

  export type RegisterRequest = {
    tel?: string;
    email: string;
    username: string;
    password: string;
    repeatPassword: string;
  }

  export type EditProfileRequest = {
    tel?: string | null;
    username: string;
    email: string;
  }
  export type ErrorResponse = {
    message: string;
  }
  //For crud
  export type BookingRaw = {
    _id: string;
    court: Court;
    user: string;
    date: string;
    startTime: string;
    endTime: string;
    deleted: boolean;
    created_at: string;
    updatedAt: string;
  }

  //Populated Booking
  export type Booking = {
    _id: string;
    court: Court;
    user: User;
    date: string;
    startTime: string;
    endTime: string;
    deleted: boolean;
    created_at: string;
    updatedAt: string;
  }

   export type CourtType = 'Clay' | 'Hard' ;

  export type Court = {
    _id: string;
    number: number;
    type: CourtType;
    isActive: boolean;
    created_at: string;
    updatedAt: string;
  }
// InstertDto's
  export type CreateCourt = {
    number: number;
    type: CourtType;
    isActive: boolean;
  }

  export type CreateBooking = {
    court: string;
    user: string;
    date: string;
    startTime: string;
    endTime: string;
  }

  export type BusySlot = {
    court: {
      number: number;
      type: CourtType;
    };
    user: {
      _id: string;
      username: string;
    };
    date: string;
    startTime: string;
    endTime: string;
  }

  export type TimeSlot = {
  start: string;
  end: string;
}

