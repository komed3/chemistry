export function formatCharge ( charge?: number ) : string {
  return charge ? ( '+' + charge ).replace( '+-', '-' ) : '±0';
}
