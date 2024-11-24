import { newObjectId, str2objectId } from '../src';

describe('Schema Test', () => {
  

  beforeEach(async () => {
    
  });

  it('new object id', () => {
    const id = newObjectId(); 
    expect(id).toBeDefined();
    expect(typeof id).toBe('object');
  });

  it('string to object is null', () => {
    const id1 = str2objectId('df');  
    expect(id1).toBeNull(); 
  });

  it('string to object', () => {
    const id=newObjectId();
    const id1 = str2objectId(`${id}`);  
    expect(id1).toEqual(id);
  });

});

