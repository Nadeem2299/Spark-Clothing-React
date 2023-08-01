import { render, screen } from '@testing-library/react';

import HeroSection from './HeroSection'

// Test Suite
describe('HeroSection', () => {
  // alt tags of images test
  it('alt contains correct value', () => {
    render(<HeroSection />)
    const firstSlide = screen.getByTestId('firstSlide');
    expect(firstSlide.alt).toContain('First slide');

    const secondSlide = screen.getByTestId('secondSlide');
    expect(secondSlide.alt).toContain('Second slide');

    const thirdSlide = screen.getByTestId('thirdSlide');
    expect(thirdSlide.alt).toContain('Third slide');
  });

  // testing for text if all are rendering fine or not
  it('has proper content related to banner carousel', () => {
    render(<HeroSection />);

    const menHeadline = screen.getByTestId('menHeadline');
    expect(menHeadline.textContent).toBe('Upto 60% Off on Mens Products');

    const menContent = screen.getByTestId('menContent');
    expect(menContent.textContent).toBe('The one-stop destination for all your shopping needs. Spark brings you the joys of shopping online in your own language, with discounts on quality-assured products, rewards for playing games, and extra SuperCoins with every purchase. With a huge selection of original products fashion and more - you get timely alerts on great deals and updates on everything you need.');

    const womenHeadline = screen.getByTestId('womenHeadline');
    expect(womenHeadline.textContent).toBe('Upto 60% Off on Womens Products');

    const womenContent = screen.getByTestId('womenContent');
    expect(womenContent.textContent).toBe('The one-stop destination for all your shopping needs. Spark brings you the joys of shopping online in your own language, with discounts on quality-assured products, rewards for playing games, and extra SuperCoins with every purchase. With a huge selection of original products fashion and more - you get timely alerts on great deals and updates on everything you need.');

    const kidsHeadline = screen.getByTestId('kidsHeadline');
    expect(kidsHeadline.textContent).toBe('Upto 60% Off on Kids Products');

    const kidsContent = screen.getByTestId('kidsContent');
    expect(kidsContent.textContent).toBe('The one-stop destination for all your shopping needs. Spark brings you the joys of shopping online in your own language, with discounts on quality-assured products, rewards for playing games, and extra SuperCoins with every purchase. With a huge selection of original products fashion and more - you get timely alerts on great deals and updates on everything you need.');
  });
})
