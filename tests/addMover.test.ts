import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { addMover } from '../src/app/MagicMover/controller';
import MagicMoverClass from '../src/app/MagicMover/model';


jest.mock('../src/app/MagicMover/model');

describe('addMover', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      body: {
        // Add mock data according to your MagicMoverClass requirements
        weightLimit: 100,
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should successfully add a Magic Mover', async () => {
    (MagicMoverClass as unknown as jest.Mock).mockImplementation(() => ({
      create: jest.fn().mockResolvedValueOnce(undefined), // Mock the create method to resolve successfully
    }));

    await addMover(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(httpStatus.CREATED);
    expect(res.json).toHaveBeenCalledWith({
      result: 'Magic Mover added successfully',
    });
    expect(next).not.toHaveBeenCalled();
  });
});
